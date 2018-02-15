import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "React-MailMerge"
});

function loadStories() {
  require("../functions/userInvitation/stories.js");
  require("../functions/userReminder/stories.js");
  // You can require as many stories as you need.
}

configure(loadStories, module);
