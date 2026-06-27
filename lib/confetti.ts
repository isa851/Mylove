import confetti from "canvas-confetti";

export function heartBurst() {
  const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 });

  confetti({
    particleCount: 140,
    spread: 90,
    scalar: 1.4,
    origin: { y: 0.55 },
    shapes: [heart],
    colors: ["#F43F5E", "#FB7185", "#F8FAFC"]
  });
}

export function proposalCelebration() {
  const end = Date.now() + 4500;
  const heart = confetti.shapeFromText({ text: "❤️", scalar: 2.4 });

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      shapes: [heart],
      colors: ["#F43F5E", "#FB7185", "#F8FAFC"]
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      shapes: [heart],
      colors: ["#F43F5E", "#FB7185", "#F8FAFC"]
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
