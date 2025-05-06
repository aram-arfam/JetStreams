// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Get the current location object, specifically the pathname
  const { pathname } = useLocation();

  // This effect runs every time the pathname changes
  useEffect(() => {
    // Scroll the window to the top left corner
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array ensures effect runs only when pathname changes

  // This component doesn't render anything visual
  return null;
}

export default ScrollToTop;