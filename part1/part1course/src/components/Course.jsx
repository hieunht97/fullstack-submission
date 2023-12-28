import Total from "./Total";

const Course = ({ course }) => {
  const Header = ({ course }) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    );
  };

  const Part = (props) => {
    return (
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
      </div>
    );
  };

  const Content = (props) => {
    return (
      <div>
        {props.parts.map((part) => (
          <Part
            key={part.id}
            name={part.name}
            exercises={part.exercises}></Part>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
