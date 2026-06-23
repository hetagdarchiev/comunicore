export interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: string | number;
  onChange: (value: string | number) => void;
  selectedValueLabel: string;
}
