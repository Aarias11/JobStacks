import Image from "next/image";
import styles from "./page.module.css";
import Button from '@/components/Button/Button'

export default function Home() {
  return (
    <div>
      <h2 className="p-10 text-text-secondary">Hello</h2>
      <Button>
        Hello
      </Button>
    </div>
  );
}
