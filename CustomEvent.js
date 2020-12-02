//自定义事件的使用
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
// const event=new CustomEvent('mock-event');
function createEvent(params, eventName = "mock-event") {
  return new CustomEvent(eventName, { detail: params });
}

const event1 = createEvent({ id: "0010" });
window.dispatchEvent(event1);
window.addEventListener("mock-event", ({ detail: { id } }) => {
  console.log("id", id);
});
