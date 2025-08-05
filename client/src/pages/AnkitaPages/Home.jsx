import Hero from "../../components/Hero";
import Benefits from "../../components/Benefits";
import CTA from "../../components/CTA";
import InputWithIcon from "../../components/InputWithIcon";
import Button from "../../components/Button";

export default function Home() {
  return (
    <div className="text-lightText">
      <Hero />
      <Benefits />
      <CTA />
      <InputWithIcon />
      <Button />
    </div>
  );
}
