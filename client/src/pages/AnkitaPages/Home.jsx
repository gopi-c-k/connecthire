import Hero from "../../components/Hero";
import Benefits from "../../components/Benefits";
import CTA from "../../components/CTA";

import { useOutletContext } from "react-router-dom";
export default function Home() {
   const { openAuth } = useOutletContext() || {};
  return (
    <div className="text-lightText">
      <Hero />
      <Benefits />
      <CTA onOpenSignup={() => openAuth && openAuth("signup")} />
      
    </div>
  );
}
 