import { tv } from "tailwind-variants";

export const styles = {
  container: tv({
    base: "min-h-screen bg-white font-sans",
  }),

  header: tv({
    base: "bg-white py-4 shadow-sm",
    variants: {
      transparent: {
        true: "bg-transparent shadow-none",
      },
    },
  }),

  navItem: tv({
    base: "text-primary-blue hover:text-black transition-colors duration-200",
    variants: {
      active: {
        true: "font-medium text-black",
      },
    },
  }),

  section: tv({
    base: "py-20",
    variants: {
      color: {
        lightBlue: "bg-light-blue",
        white: "bg-white",
        gray: "bg-gray-50",
      },
    },
  }),

  title: tv({
    base: "font-bold text-3xl md:text-4xl tracking-tight mb-6",
    variants: {
      centered: {
        true: "text-center",
      },
      color: {
        primary: "text-primary-blue",
        dark: "text-gray-800",
      },
    },
  }),

  subtitle: tv({
    base: "text-gray-600 mb-6",
    variants: {
      centered: {
        true: "text-center",
      },
    },
  }),

  card: tv({
    base: "rounded-lg shadow-md hover:shadow-lg transition-shadow p-6",
    variants: {
      bordered: {
        true: "border border-gray-100",
      },
    },
  }),

  button: tv({
    base: "rounded-md font-medium transition-colors",
    variants: {
      color: {
        primary: "bg-primary-blue text-white hover:bg-blue-600",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "bg-transparent border border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  }),

  footer: tv({
    base: "bg-gray-100 py-12 text-center",
  }),

  footerLink: tv({
    base: "text-gray-600 hover:text-black transition-colors",
  }),
};

// Módulo de estilos adicionales para el sitio DoctQR
export const doctqrStyles = {
  // Colores corporativos
  colors: {
    primaryBlue: "#007aff",
    lightBlue: "rgb(200, 228, 255)",
    darkGray: "#494949",
    lightGray: "#f5f5f5",
  },
  
  // Estilos para las secciones específicas
  intro2: {
    container: "bg-light-blue py-20",
    title: "text-4xl font-bold leading-tight",
    text: "text-gray-700 mt-4",
    buttons: "flex gap-4 mt-6",
  },
  
  service: {
    container: "py-20",
    header: "text-center mb-12",
    title: "text-3xl font-bold",
    subtitle: "text-gray-600 mt-2",
    cardContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
    card: "p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow",
    cardImage: "flex justify-center mb-4",
    cardTitle: "text-xl font-semibold text-center mb-2",
    cardText: "text-gray-600 text-center",
  },
  
  about: {
    container: "py-20",
    title: "text-3xl font-bold mb-6",
    text: "text-gray-600",
    image: "rounded-lg shadow-md",
  },
  
  // Utilidades responsivas
  responsive: {
    hideOnMobile: "hidden md:block",
    showOnlyOnMobile: "block md:hidden",
    gridOneToTwo: "grid-cols-1 md:grid-cols-2",
    gridOneToFour: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  },
};