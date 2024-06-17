import * as styles from "./button.css.ts";

type Props = {
  link: string;
  title: string;
};

export default function Button({ link, title }: Props) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="lg:px-4 px-2 max-w-full xl:w-56 xl:h-20 h-16 flex justify-center items-center border rounded-xl bg-teal-dark">
        <h1 className="flex justify-center items-center text-white 2xl:text-lg text-base leading-4">{title}</h1>
    </a>
  );
}
