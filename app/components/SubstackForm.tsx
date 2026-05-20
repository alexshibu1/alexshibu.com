export default function SubstackForm() {
  return (
    <form
      className="substack-form"
      action="https://shibusays.substack.com/subscribe"
      method="get"
      target="_blank"
      rel="noopener noreferrer"
    >
      <label htmlFor="substack-email" className="sr-only">
        Email address
      </label>
      <input
        id="substack-email"
        name="email"
        type="email"
        placeholder="your@email.com"
        className="substack-input"
        aria-label="Email address"
      />
      <button type="submit" className="substack-button">
        Join ↗
      </button>
    </form>
  );
}
