import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";
import NoteForm from "./NoteForm";
import Togglable from "./Togglable";

//test Togglable
describe("<Togglable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test("render its children", async () => {
    console.log(container.innerHTML);
    await screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    console.log(container.innerHTML);
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("renders content", async () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    const mockHandler = jest.fn();

    render(<Note note={note} toggleImportance={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("make not important");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});

//test NoteForm
test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  render(<NoteForm createNote={createNote} />);

  const input = screen.getByPlaceholderText("okay enter a note");
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});

//test Note
describe("Note test", () => {
  test("renders content", () => {
    const note = {
      content: "Does not work anymore :(",
      important: true,
    };

    render(<Note note={note} />);

    const element2 = screen.findByText("Does not work anymore :(");
    expect(element2).toBeDefined();
  });

  test("does not render this", () => {
    const note = {
      content: "This is a reminder",
      important: true,
    };

    render(<Note note={note} />);

    const element = screen.queryByText("do not want this thing to be rendered");
    expect(element).toBeNull();
  });
});
