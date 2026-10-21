import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function legacyRouteRedirectPlugin(): Plugin {
  return {
    name: 'legacy-route-redirect',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const [pathname] = url.split('?');

        if (pathname === '/about' || pathname === '/about.html') {
          res.writeHead(302, { Location: '/#about' });
          return res.end();
        }
        if (pathname === '/services' || pathname === '/services.html') {
          res.writeHead(302, { Location: '/#services' });
          return res.end();
        }
        if (pathname === '/contact' || pathname === '/contact.html') {
          res.writeHead(302, { Location: '/#contact' });
          return res.end();
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const [pathname] = url.split('?');

        if (pathname === '/about' || pathname === '/about.html') {
          res.writeHead(302, { Location: '/#about' });
          return res.end();
        }
        if (pathname === '/services' || pathname === '/services.html') {
          res.writeHead(302, { Location: '/#services' });
          return res.end();
        }
        if (pathname === '/contact' || pathname === '/contact.html') {
          res.writeHead(302, { Location: '/#contact' });
          return res.end();
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [react(), legacyRouteRedirectPlugin()],
})
