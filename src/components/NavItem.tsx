type Props = {
  icon: React.JSX.Element;
  name: string;
  active: boolean;
};

function NavItem({ icon, name, active }: Props) {
  return (
    <div
      onClick={() => {
        const element = document.getElementById(name.toLowerCase());
        element?.scrollIntoView({ behavior: 'smooth' });
      }}
      className={`h-12 w-12 cursor-pointer rounded-full p-3 transition-all duration-200 hover:scale-110 ${active ? 'bg-primary text-accent' : 'bg-accent text-primary hover:bg-primary/80'} sm:h-12 sm:w-12`}
      aria-label={name}
    >
      {icon}
    </div>
  );
}

export default NavItem;
