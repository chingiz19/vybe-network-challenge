import { useMemo } from "react";
import VybeLogo from "./VybeLogoSVG";

const userName = "Jon Doe";

const greetings = [
  `Welcome back, {name}! 🌟 Let's achieve great things today.`,
  `Good day, {name}! Ready to dive in? 💼`,
  `Hello, {name}! Your success story starts here! 🏆`,
  `Hey there, {name}! Let's crush those goals! 🚀`,
  `Hi {name}! 🌞 Another day, another opportunity.`,
  `Great to see you, {name}! Let's get started! 🎉`,
  `Welcome, {name}! 🧠 Ready for some insights?`,
  `{name}, your dashboard is waiting! ⚡️`,
  `What's new, {name}? Let's make today count! 📈`,
  `Greetings, {name}! Let's make some magic happen! ✨`,
];

const NavBar = () => {
  const greeting = useMemo(() => {
    const randomGreetingIdx = Math.floor(Math.random() * greetings.length);
    return greetings[randomGreetingIdx].replace(
      "{name}",
      `<strong>${userName}</strong>`
    );
  }, []);

  return (
    <nav className="bg-zinc-800 p-4 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex font-bold text-2xl gap-3 items-center">
          <VybeLogo width={50} height={50} />
          <span>Vybe Network - Analytics</span>
        </div>
        <div className="flex items-center space-x-3">
          {greeting && (
            <div className="animate-slide-in">
              <span dangerouslySetInnerHTML={{ __html: greeting }} />
            </div>
          )}
          <i className="fas fa-user-circle text-2xl" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
