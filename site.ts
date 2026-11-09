export const site = {
  name: "Luz de Orión",
  tagline: "Un universo para explorar, conectar y transformar.",
  contactName: "Marina",
  whatsapp: "5493546525509",
  whatsappMessage: "Hola Marina, estuve explorando Luz de Orión y me gustaría conocer más sobre tus propuestas.",
};

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const experiences = [
  { number: "01", title: "Geometría viva", category: "Explorar", text: "Un espacio para descubrir formas, ritmos y proporciones presentes en la naturaleza.", icon: "geometry" },
  { number: "02", title: "Mandalas", category: "Crear", text: "Composiciones circulares para jugar con simetrías, color y patrones.", icon: "mandala" },
  { number: "03", title: "Universo botánico", category: "Contemplar", text: "Hojas, flores y estructuras orgánicas como inspiración para crear.", icon: "botanical" },
];

export const faqs = [
  { q: "¿Qué voy a encontrar en Luz de Orión?", a: "Un espacio digital en construcción, pensado para reunir propuestas, experiencias y recursos creativos. Los contenidos específicos se irán completando con información validada por Marina." },
  { q: "¿Cómo puedo consultar por las propuestas?", a: "Podés comunicarte directamente con Marina mediante el botón de WhatsApp disponible en la página." },
  { q: "¿Puedo explorar las experiencias desde el celular?", a: "Sí. El sitio está diseñado para adaptarse a pantallas de escritorio, tablet y teléfono." },
];