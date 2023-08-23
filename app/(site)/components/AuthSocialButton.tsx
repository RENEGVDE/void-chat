import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
  inline-flex
  w-full 
  justify-center 
  rounded-md 
  bg-neutral-600 
  px-4 
  py-2 
  text-slate-200 
  shadow-sm 
  ring-1 
  ring-inset 
  ring-slate-600 
  hover:bg-neutral-400 
  hover:text-slate-200 
  focus:outline-offset-0
"
    >
      {<Icon />}
    </button>
  );
};

export default AuthSocialButton;
