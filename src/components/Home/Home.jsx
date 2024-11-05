import React from 'react';
import paris from '../../assets/paris.webp'; // Asegúrate de que estas imágenes estén en la carpeta correcta
import ny from '../../assets/ny.webp';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import '../../index.css';

function Home() {
  return (
    <>
      {/* Encabezado con fondo gris oscuro y transparencia */}
      <div className="header text-light text-center py-5" style={{ backgroundColor: 'rgba(50, 50, 50, 0.7)' }}>
        <h1 className="tituloHome display-4 fw-bold">Viajes baratos, compara y paga menos</h1>
        <p className="lead">Encuentra las mejores ofertas y ahorra en tu próximo viaje</p>
      </div>

      {/* Comparador de sitios de viajes compacto */}
      <div className="brands-wrapper text-light text-center py-2" style={{ backgroundColor: 'rgba(50, 50, 50, 0.7)' }}>
        <span className="d-block fw-bold mb-2" style={{ fontSize: '1rem' }}>Compará cientos de sitios de viajes en una sola búsqueda</span>
        <div className="brands-container d-flex justify-content-center">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto/img/brands/pax.png" title="Asistencia al viajero" alt="Asistencia al viajero" className="mx-2 brand-logo" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto/img/brands/Booking.png" title="Booking" alt="Booking" className="mx-2 brand-logo" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto/img/brands/Flybondi.png" title="Flybondi" alt="Flybondi" className="mx-2 brand-logo" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto/img/brands/Volala.png" title="Volala" alt="Volala" className="mx-2 brand-logo" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto/img/brands/Atrapalo.png" title="Atrapalo" alt="Atrapalo" className="mx-2 brand-logo" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto/img/brands/JetSmart.png" title="JetSmart" alt="JetSmart" className="mx-2 brand-logo" />
          </a>
        </div>
      </div>

      {/* Carrusel de imágenes */}
      <div id="homeCarousel" className="carousel slide mt-4 shadow-sm rounded" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={paris} className="d-block w-100 rounded" alt="París de noche" />
            <div className="carousel-caption text-start bg-opacity-50">
              <h3 className="tituloHome display-4 fw-bold">París de noche</h3>
              <p className="lead">Disfruta de la mágica iluminación de la ciudad del amor.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={ny} className="d-block w-100 rounded" alt="Nueva York de noche" />
            <div className="carousel-caption text-start bg-opacity-50">
              <h3 className="tituloHome display-4 fw-bold">Nueva York de noche</h3>
              <p className="lead">Explora las luces brillantes de la ciudad que nunca duerme.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img1} className="d-block w-100 rounded" alt="Naturaleza" />
            <div className="carousel-caption text-start bg-opacity-50">
              <h3 className="tituloHome display-4 fw-bold">ÚNETE A LA NATURALEZA</h3>
              <p className="lead">Todo lo que necesitas para una experiencia de viaje perfecta.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100 rounded" alt="Aventura" />
            <div className="carousel-caption text-start bg-opacity-50">
              <h3 className="tituloHome display-4 fw-bold">Aventura en cada paso</h3>
              <p className="lead">Disfruta de paisajes increíbles y actividades al aire libre.</p>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Banner antes del footer */}
      <div className="text-center my-4">
        <img src="https://assets.turismocity.com/img/home/banner-app-new-AR.png" className="img-fluid shadow-sm rounded" alt="banner-app-AR" />
      </div>

      {/* Footer */}
      <footer className="footer mt-auto py-3 bg-dark text-light">
        <div className="container text-center">
          <span>© 2024 Altos Senderos. Todos los derechos reservados.</span>
        </div>
      </footer>
    </>
  );
}

export default Home;
