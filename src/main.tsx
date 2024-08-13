import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ClientProvider from "./providers/ClientProvider";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <ClientProvider>
      <App/>
    </ClientProvider>
  </ChakraProvider>

)
