import CategoryPills from "@/components/category-pills";
import LogoModal from "@/components/logo-modal";
import SearchBar from "@/components/search-bar";
import SizeToggle from "@/components/size-toggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SearchBar />
      <CategoryPills />
      <SizeToggle />
      <LogoModal />
    </>
  );
}
