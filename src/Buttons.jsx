import { Mic, Star, Home, ClipboardList, Megaphone, User, BookOpen, Users, ArrowRight, Zap, BarChart2 } from 'lucide-react';
import styles from './NavigationPanel.module.css';

const cards = [
  { title:'Inicio',       sub:'Vista general',      icon:Home,          box:'v', tag:'Discurso',  tagC:'d' },
  { title:'Actividades',  sub:'Guía de actividades',   icon:ClipboardList, box:'t', tag:'Guía',      tagC:'g' },
  { title:'Oratoria',     sub:'Discurso - Gran Creador | 101',   icon:Megaphone,     box:'c', tag:'Público',   tagC:'p' },
  { title:'Perfil',       sub:'Tu estilo personal', icon:User,          box:'b', tag:'Discurso',  tagC:'d' },
  { title:'Recursos',     sub:'Material de apoyo',  icon:BookOpen,      box:'a', tag:'Guía',      tagC:'g' },
  { title:'Comunidad',    sub:'Practica en grupo',  icon:Users,         box:'p', tag:'Público',   tagC:'p' },
];

const quickCards = [
  { icon:Zap,      color:'v', title:'Sesión rápida',  desc:'Practica un discurso corto de 5 minutos con retroalimentación inmediata.' },
  { icon:BarChart2,color:'t', title:'Tu progreso',    desc:'Revisa tus avances, métricas y logros de las últimas sesiones.' },
];

export default function NavigationPanel({ onNavigate }) {
  return (
    <div className={styles.page}>

      <div className={styles.topbar}>
        <div className={styles.logo}>
          <div className={styles.logoDot}><Mic size={14} color="#fff" /></div>
          <span className={styles.logoName}>OratoriaPro</span>
        </div>
        <div className={styles.topbarNav}>
          <button className={styles.topbarBtn}>Ayuda</button>
          <button className={`${styles.topbarBtn} ${styles.topbarBtnActive}`}>Mi cuenta</button>
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.pill}><Star size={12} /> Plataforma de comunicación</div>
        <h1 className={styles.heroTitle}>Bienvenido a tu centro<br />de oratoria</h1>
        <p className={styles.heroDesc}>
          Todo lo que necesitas para preparar, practicar y perfeccionar tus discursos
          en un solo lugar. Elige por dónde empezar.
        </p>
        <div className={styles.stats}>
          {[['12','Discursos'],['6','Actividades'],['3','En progreso']].map(([n,l],i)=>(
            <>
              {i>0 && <div className={styles.statDiv} key={'d'+i}/>}
              <div className={styles.stat} key={l}>
                <span className={styles.statNum}>{n}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            </>
          ))}
        </div>
      </div>

      <p className={styles.sectionLabel}>Secciones principales</p>

      <div className={styles.grid}>
        {cards.map(({ title, sub, icon:Icon, box, tag, tagC }) => (
          <button key={title} className={styles.card} onClick={() => window.location.href = ({ Inicio:"/inicio", Actividades:"/meet", Oratoria:"/gran-creador", Perfil:"/perfil", Recursos:"/recursos", Comunidad:"/comunidad" })[title]} aria-label={title}>
            <div className={styles.cardHead}>
              <div className={`${styles.ibox} ${styles['ibox'+box]}`}><Icon size={19} /></div>
              <span className={`${styles.ctag} ${styles['ctag'+tagC]}`}>{tag}</span>
            </div>
            <div>
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.cardSub}>{sub}</div>
            </div>
            <span className={styles.cardArrow}><ArrowRight size={15} /></span>
          </button>
        ))}
      </div>

      <p className={styles.sectionLabel}>Accesos rápidos</p>

      <div className={styles.infoRow}>
        {quickCards.map(({ icon:Icon, color, title, desc }) => (
          <div key={title} className={styles.infoCard}>
            <div className={`${styles.infoIcon} ${styles['ibox'+color]}`}><Icon size={17} /></div>
            <div>
              <div className={styles.infoTitle}>{title}</div>
              <div className={styles.infoDesc}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footerStrip}>
        <span className={styles.footerText}>¿Necesitas orientación? Explora la guía de inicio.</span>
        <button className={styles.footerLink} onClick={() => window.location.href = '/guia-actividades'}>Ver guía ↗</button>
      </div>

    </div>
  );
}