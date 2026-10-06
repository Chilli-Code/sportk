import Logo from '../ui/Logo'
export default function LandingFooter() {
  return (
    <footer id="contacto" className="ftr"><div className="wrap">
      <div className="row">
        <div><Logo /><p className="t-sm" style={{ marginTop: 12 }}>Ropa deportiva personalizada.</p></div>
        <nav>
          <div><a href="#coleccion">Colección</a><a href="#personalizacion">Personalización</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a></div>
          <div><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Facebook</a></div>
          <div><a href="#">Privacidad</a><a href="#">Términos</a></div>
        </nav>
      </div>
      <div className="bt"><span>© {new Date().getFullYear()} LYAN EMEL</span></div>
    </div></footer>
  )
}
