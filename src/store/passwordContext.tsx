import { createContext, useState } from "react";

export const PasswordContext = createContext<{
  isTrue: boolean;
  setIsTrue: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isTrue: false,
  setIsTrue: () => {},
});

export const PasswordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTrue, setIsTrue] = useState(false);

  return (
    <PasswordContext.Provider value={{ isTrue, setIsTrue }}>
      {children}
    </PasswordContext.Provider>
  );
};
