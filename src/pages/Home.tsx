import CastleCardSmall from "../components/CastleCardSmall"

const Home = () => {
  // TODO: Add date picker for the select date field
  // TODO: Install tailwind and ShadCN
  // https://daypicker.dev/docs/selection-modes

  return (
    <div>

      <div>
        {/* Search castles */}
        <div>
          <input type="text" placeholder="Search location" />
          <input type="text" placeholder="Select date"/>
          <input type="text" placeholder="Select guests" />
          <input type="text" placeholder="Filter" />
          <button>Search</button>
        </div>
      </div>

    <div>
      <h1>Check Into a Fairytale</h1>
      <p>Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? With Nobal Stay, your storybook stay begins for real.</p>
    </div>

    <div>

      {/* Scandinavia castles carousel */}
      <h2>Scandinavia</h2>
      <div>
        <CastleCardSmall />
        <CastleCardSmall />
        <CastleCardSmall />
      </div>

      {/* Sweden castles carousel */}
      <h2>Sweden</h2>
      <div>
        <CastleCardSmall />
        <CastleCardSmall />
        <CastleCardSmall />
      </div>

    </div>

    </div>
  )
}
export default Home