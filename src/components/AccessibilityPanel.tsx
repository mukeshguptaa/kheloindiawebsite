import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, 
  Type, 
  ArrowUpDown, 
  Link as LinkIcon, 
  ArrowLeftRight, 
  ImageOff, 
  MousePointer2, 
  Moon, 
  Contrast, 
  RotateCcw,
  X,
  Sun
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AccessibilityOptionProps {
  icon: any;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const AccessibilityOption: React.FC<AccessibilityOptionProps> = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-4 rounded-[8px] border transition-all duration-300 group relative overflow-hidden h-[100px]",
        "bg-white border-[#EEF0F3] hover:shadow-lg dark:bg-[#141C2B] dark:border-[#26334A]",
        isActive && "border-[#db4001] ring-1 ring-[#db4001]"
      )}
    >
      <Icon className={cn(
        "size-6 transition-colors duration-300",
        "text-[#0F1A2A] dark:text-[#F4F5F7]",
        isActive && "text-[#db4001] dark:text-[#db4001]"
      )} />
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-wider text-center leading-tight transition-colors duration-300",
        "text-[#0F1A2A] dark:text-[#F4F5F7]",
        isActive && "text-[#db4001] dark:text-[#db4001]"
      )}>
        {label}
      </span>
      {isActive && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#db4001] rounded-bl-full" />
      )}
    </button>
  );
};

export const AccessibilityPanel = ({ isOpen, onClose }: AccessibilityPanelProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const options = [
    { icon: Volume2, label: "Text To Speech" },
    { icon: Type, label: "Bigger Text" },
    { icon: Type, label: "Small Text" },
    { icon: ArrowUpDown, label: "Line Height" },
    { icon: LinkIcon, label: "Highlight Links" },
    { icon: ArrowLeftRight, label: "Text Spacing" },
    { icon: Type, label: "Dyslexia Friendly" },
    { icon: ImageOff, label: "Hide Images" },
    { icon: MousePointer2, label: "Cursor" },
    { icon: Moon, label: "Light-Dark", onClick: toggleTheme },
    { icon: Contrast, label: "Invert Colors" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed top-0 right-0 h-full w-[400px] shadow-2xl z-[101] flex flex-col overflow-hidden",
              "bg-[#F4F5F7] dark:bg-[#0B1421]"
            )}
          >
            {/* Header */}
            <div className="bg-[#db4001] p-5 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">Accessibility options</h3>
              <button 
                onClick={onClose}
                className="text-white hover:scale-110 transition-transform"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-3 gap-4">
                {options.map((option, idx) => (
                  <AccessibilityOption 
                    key={idx} 
                    icon={option.icon} 
                    label={option.label} 
                    onClick={option.onClick}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6">
              <button 
                className={cn(
                  "w-full flex items-center justify-center gap-3 py-4 rounded-[8px] font-bold transition-all duration-300",
                  "bg-[#FFF3EC] text-[#db4001] hover:bg-[#FFE8D9]",
                  "dark:bg-[#3A1E10] dark:text-[#db4001] dark:hover:bg-[#4A2615]"
                )}
              >
                <RotateCcw size={20} />
                Reset All Settings
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
