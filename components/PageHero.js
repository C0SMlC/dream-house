import Image from "next/image";

export default function PageHero({ title, subtitle, imagePath }) {
  return (
    <div className="relative h-[300px] md:h-[400px] w-full">
      <Image
        src={imagePath || "/images/default-hero.jpg"}
        alt={title}
        fill
        className="object-cover brightness-75"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && <p className="text-xl text-white max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
