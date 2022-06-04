const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const stories = [
  {
    id: "1",
    title: "A Patriotic Story",
    content:
      "Maecenas vel eros sem. Nunc non tellus in est fringilla tincidunt in ac sem.",
    author: "Major",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    id: "2",
    title: "A Thriller Story",
    content:
      "Aliquam auctor quam vel justo tincidunt, ut aliquam ligula tristique Ut turpis nisi, euismod a mi et, finibus.",
    author: "Vikram",
    createdAt: DateTime.local(2022, 7, 25, 0).toLocaleString(
      DateTime.DATETIME_SHORT
    ),
  },
];

exports.find = () => stories;

exports.findById = (id) => stories.find((story) => story.id === id);

exports.save = (story) => {
  story.id = uuidv4();
  story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
  stories.push(story);
};

exports.updateById = (id, newStory) => {
  let story = stories.find((story) => story.id === id);
  console.log(story);
  if (story) {
    story.title = newStory.title;
    story.content = newStory.content;
    return true;
  } else {
    return false;
  }
};

exports.deleteById = (id, story) => {
  let index = stories.findIndex((story) => story.id === id);
  if (index !== -1) {
    stories.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
