import { HoverEffect } from "./card-hover-grid";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
    {
      id: 1,
      name: 'Developer Collaboration',
      description: 'Collaborate with developers worldwide. Share ideas, work together on projects, and learn from each other in a supportive environment.',
    },
    {
      id: 2,
      name: 'One-to-One Video Call',
      description: 'Connect with developers through video calls. Discuss projects, troubleshoot issues, or simply network with like-minded individuals.',
    },
    {
      id: 3,
      name: 'Project Learning',
      description: 'View and learn from a list of projects. Gain insights into different coding practices, project structures, and innovative solutions.',
    },
    {
      id: 4,
      name: 'Code Review',
      description: 'Improve your code quality through peer reviews. Submit your code and receive constructive feedback from experienced developers.',
    },
    {
      id: 5,
      name: 'Mentorship Program',
      description: 'Join our mentorship program. Learn directly from experienced developers and enhance your coding skills in a focused, one-on-one setting.',
    },
    {
      id: 6,
      name: 'Open Source Contribution',
      description: 'Contribute to open source projects. Gain real-world experience by working on active projects and collaborating with global development teams.',
    }
  ];
  