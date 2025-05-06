type Props = {
  icon: React.JSX.Element;
  name: string;
  active: boolean; // Include the active prop
};

function NavItem({ icon, name, active }: Props) {
  return (
    <div
      //scroll to the section on click
      onClick={() => {
        const element = document.getElementById(name.toLowerCase());
        element?.scrollIntoView({ behavior: 'smooth' });
      }}
      className={`h-12 w-12 cursor-pointer rounded-full p-3 ${active ? 'bg-primary text-accent' : 'bg-accent text-primary'} `}
      aria-label={name}
    >
      {icon}
    </div>
  );
}

export default NavItem;
