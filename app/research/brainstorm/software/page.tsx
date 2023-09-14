import type { NextPage } from "next";
import Head from "next/head";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brainstorm Software",
  description:
    "The design decisions behind a complex brain computer interface.",
};

const Software: NextPage = () => {
  return (
    <div className="dark:text-white text-lg">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Brainstorm: Design Principles
        </h1>
        <p>Jett Hays</p>
        <p>
          <em>Human Computer Interaction Department</em>
        </p>
        <p>
          <em>
            Carnegie Mellon University, 5000 Forbes Avenue, Pittsburgh, PA
          </em>
        </p>
        <p>
          <em>jehays@andrew.cmu.edu</em>
        </p>

        <br />
        <p>
          <b>Languages:</b> C# and Python{" "}
        </p>
        <p>
          <b>Application:</b> Windows form
        </p>
        <p>
          <b>Repository:</b> https://github.com/jettblu/brainStorm{" "}
        </p>
        <p>
          <b>Architecture:</b> Model View Controller (Event Driven Data Feed){" "}
        </p>
        <p>
          <b>Package Dependencies:</b> Accord.Net, Math.Net{" "}
        </p>
        <br />

        <h2 className="text-2xl font-semibold">Is this for you?</h2>
        <p>
          This paper is for developers trying to customize Brainstorm or for
          anyone trying to understand how a complex system can be constructed
          from simple principles.
        </p>
        <h3>Philosophy</h3>

        <p>
          <em>
            Note: <u>Software</u> is the general architecture of Brainstorm’s
            programs, while <u>code</u> is the manifestation of that
            architecture.
          </em>
        </p>
        <p>
          With a prototype like Brainstorm, it is impossible to separate great
          research from great software design. While Brainstorm is still a
          work-in-progress, it works and represents progress, because it follows
          the design principles below.{" "}
        </p>
        <br />
        <h2 className="text-2xl font-semibold">Design Principles</h2>
        <h5 className="text-xl mt-4 mb-2">
          <em>1. User first, Code Second</em>
        </h5>
        <p>
          Brainstorm is a machine whose value stems from replacing user burden
          with technical solutions. The mechanics of how Brainstorm transforms
          brainwaves into language are unimportant for the user. All the user
          cares about is if Brainstorm works and if it works well. The software
          behind Brainstorm ensures both ifs are met with consistent performance
          and clear error handling
        </p>
        <h5 className="text-xl mt-4 mb-2">
          <em>2. Make Assumptions Few and Weak</em>
        </h5>
        <p>
          Strong assumptions = weak programs. Weak assumptions = strong
          programs. As a platform for both users and developers, Brainstorm
          tries to minimize the scope and strength of its assumptions. This
          allows for a better user experience and enables developers to
          customize algorithms with ease.
        </p>
        <h5 className="text-xl mt-4 mb-2">
          <em>3. Easy to Understand Code &gt; Slightly More Efficient Code</em>
        </h5>
        <p>
          Don’t make simple things complex. Variable names are descriptive and
          reusable computations are relegated to helper functions. Breaking a
          complex chain of logic into understandable steps makes Brainstorm
          easier to update and maintain.{" "}
        </p>
        <h5 className="text-xl mt-4 mb-2">
          <em>4. Leave a Trail</em>
        </h5>
        <p>
          Each section of code has in line documentation that details what and
          how it’s doing. By leaving a trail through complex code structures,
          Brainstorm allows developers to locate and understand relevant
          algorithms.{" "}
        </p>
        <br />
        <h2 className="text-2xl font-semibold">Implementation</h2>
        <p>
          Brainstorm is woven together by the robust seams of Model View
          Controller architecture. MVC architecture allows for an iterative
          testing process in which various aspects of the software can be
          evaluated and subsequently modified based on performance without
          demolishing the architecture as a whole. By separating concerns,
          Brainstorm provides developers with a versatile system that can be
          adapted to fit future virtual keyboard research. An event driven data
          feed supplies the model with a continuous stream of information that
          is used to update the view and change system state.{" "}
        </p>
      </div>
    </div>
  );
};

export default Software;
