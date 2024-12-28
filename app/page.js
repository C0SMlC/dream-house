import HeroSlideshow from "@/components/HeroSlideshow";
import SearchBar from "@/components/SearchBar";
import ProjectsList from "@/components/ProjectsList";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4">
        <SearchBar />
        <ProjectsList
          title="Recommended Projects"
          subtitle="The most search projects in Dronagiri, Navi Mumbai"
        />
        <ProjectsList
          title="Projects for sale"
          subtitle="Featured projects in Dronagiri, Navi Mumbai"
        />
      </div>
    </>
  );
}
