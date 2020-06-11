/**
 *
 * Init
 *
 */
import "./init.less";
import templateHtml from "./init.html";

export default {
  init() {
    this.render();
  },
  async render() {
    $("#renderBody").html(templateHtml);

    this.handleEvents();
  },
  handleEvents() {

  }
};
