const App = () => {
  interface HeaderProps {
    courseName: string;
  }

  interface ContentProps {
    courseParts: CoursePart[];
  }

  interface TotalProps {
    totalExercise: number;
  }

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string;
    kind: "background";
  }

  interface CoursePartSpecial extends CoursePartWithDescription {
    requirements: string[];
    kind: "special";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case "basic":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            <i>{part.description}</i>
          </p>
        );
      case "group":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>{" "}
            <br />
            project exercises {part.groupProjectCount}
          </p>
        );
      case "background":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>{" "}
            <br />
            <i>{part.description}</i> <br />
            submit to {part.backgroundMaterial}
          </p>
        );
      case "special":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount} <br />
            </b>
            <i>{part.description}</i> <br />
            required skills: {part.requirements.join(", ")} <br />
          </p>
        );
      default:
        return assertNever(part);
    }
  };

  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>;
  };

  const Content = (props: ContentProps) => {
    return (
      <div>
        {props.courseParts.map((c: CoursePart) => (
          <Part key={c.name} part={c} />
        ))}
      </div>
    );
  };

  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.totalExercise}</p>;
  };

  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercise={totalExercises} />
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default App;
