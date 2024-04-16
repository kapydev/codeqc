export default function LoginScreenWithDropdown({
  className = "",
}: LoginScreenWithDropdownProps) {
  return (
    <div
      className={`font-poppins inline-flex w-full flex-col items-center gap-y-12 bg-white pt-12 text-sm leading-[normal] tracking-[0px] ${className}`}
    >
      <img
        className="h-48 w-48 object-cover object-center"
        src="/assets/image-2.png"
       />
      <div className="flex flex-col items-center justify-center gap-y-3.5 self-stretch bg-red-600 px-9 py-24" >
        <div className="self-stretch text-left font-bold text-white">
          Username
        </div>
        <div className="flex items-center self-stretch rounded-xl bg-red-300 px-4 py-3 text-left font-normal text-white" >
          Enter username
        </div>
        <div className="self-stretch text-left font-bold text-white">
          Password
        </div>
        <div className="flex items-center self-stretch rounded-xl bg-red-300 px-4 py-3 text-left font-normal text-white" >
          Enter password
        </div>
        <div className="self-stretch text-left font-bold text-white">
          Dropdown
        </div>
        <div className="flex items-center justify-center gap-x-40 self-stretch rounded-xl bg-red-300 p-3 text-left font-normal text-black" >
          <div className="flex items-center">Dropdown</div>
          <img
            className="h-6 w-6 flex-shrink-0"
            src="/assets/Icons.svg"
           />
        </div>
        <div className="flex items-end justify-center self-stretch pr-0 pt-2 text-center font-bold text-red-600" >
          <div className="flex items-center justify-center self-stretch rounded-2xl bg-white px-7 py-2.5" >
            <div className="flex items-center justify-center pb-0.5 pr-[2.8px]" >
              Login
            </div>
          </div>
        </div>
        <div className="flex justify-center self-stretch pt-2 text-center text-white" >
          <span>
            <span className="font-medium">Not registered?</span>
            <span className="whitespace-pre-wrap font-bold">
              {" Create an account"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

interface LoginScreenWithDropdownProps {
  className?: string;
}

/**
 * This component was generated from Figma with FireJet.
 * Learn more at https://www.firejet.io
 *
 * README:
 * The output code may look slightly different when copied to your codebase. To fix this:
 * 1. Include the necessary fonts. The required fonts are imported from public/index.html
 * 2. Include the global styles. They can be found in App.css
 *
 * Note: Step 2 is not required for tailwind.css output
 */
