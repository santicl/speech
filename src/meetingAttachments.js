function database() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('Este navegador no permite guardar archivos localmente.'))
      return
    }
    let blocked = false
    const request = window.indexedDB.open('meeting-attachments', 1)
    request.onupgradeneeded = () => request.result.createObjectStore('pdfs', { keyPath: 'id' })
    request.onerror = () => reject(request.error)
    request.onblocked = () => {
      blocked = true
      reject(new Error('Cierra otras pestañas del programa y vuelve a intentar.'))
    }
    request.onsuccess = () => {
      const db = request.result
      if (blocked) { db.close(); return }
      db.onversionchange = () => db.close()
      resolve(db)
    }
  })
}

async function transaction(mode, action) {
  const db = await database()
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('pdfs', mode)
      const request = action(tx.objectStore('pdfs'))
      tx.oncomplete = () => resolve(request.result)
      tx.onabort = () => reject(tx.error || new Error('El navegador no pudo guardar el archivo.'))
      tx.onerror = () => {}
    })
  } finally {
    db.close()
  }
}

export async function validatePdf(file) {
  if (!file || (!/\.pdf$/iu.test(file.name) && file.type !== 'application/pdf')) throw new Error('Elige un archivo PDF.')
  const header = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('No se pudo leer el archivo seleccionado.'))
    reader.readAsText(file.slice(0, 1024))
  })
  if (!header.includes('%PDF-')) throw new Error('El archivo seleccionado no contiene un PDF válido.')
}

export async function savePdf(file) {
  await validatePdf(file)
  const id = window.crypto.randomUUID?.() || Array.from(window.crypto.getRandomValues(new Uint8Array(24)), byte => byte.toString(16).padStart(2, '0')).join('')
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('No se pudo leer el archivo seleccionado.'))
    reader.readAsArrayBuffer(file)
  })
  await transaction('readwrite', store => store.put({ id, data }))
  return { id, name: file.name, size: file.size }
}

export async function readPdf(id) {
  const result = await transaction('readonly', store => store.get(id))
  if (result?.data) return new Blob([result.data], { type: 'application/pdf' })
  if (!result?.blob) throw new Error('Este PDF no está disponible en este navegador. Puedes volver a adjuntarlo al editar el punto.')
  return result.blob
}

export function deletePdf(id) {
  return id ? transaction('readwrite', store => store.delete(id)) : Promise.resolve()
}

export function attachmentError(error) {
  return error.name === 'QuotaExceededError'
    ? 'El navegador no tiene espacio para guardar este PDF. Elige un archivo más pequeño o libera espacio.'
    : error.message || 'No se pudo guardar el PDF. Vuelve a intentar.'
}
