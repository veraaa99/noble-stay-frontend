import DateCalendar from "./DateCalendar"

const ListingForm = () => {
  return (
    <div>
        <form action="">
            <div>
                <h3>Name of castle</h3>
                <input type="text" name="" id="" />
            </div>
            <div>
                <h3>Location</h3>
                <input type="text" name="" id="" />
            </div>
            <div>
                <h3>Description</h3>
                <input type="text" name="" id="" />
            </div>
            <div>
                <h3>Set avaliable dates</h3>
                <DateCalendar />
            </div>
            <div>
                <h3>Set maximum of guests per booking</h3>
                <input type="text" name="" id="" />
            </div>
            <div>
                <h3>What type of rooms do you offer?</h3>
                <input type="text" name="" id="" />
                <h3>How many of each room?</h3>
                <input type="text" name="" id="" />
            </div>
            <div>
                <h3>Price per night:</h3>
                <input type="text" name="" id="" />
                <h3>Price per room:</h3>
                <input type="text" name="" id="" />
            </div>
            <div>
                <h3>What amneties do you offer?</h3>
                <input type="text" name="" id="" />
            </div>
            <div>
                <h3>Set house rules and cancellation policy</h3>
                <input type="text" name="" id="" />
            </div>
            <div>
                <h3>Set contact email to castle owner</h3>
                <input type="text" name="" id="" placeholder="dummyEmail"/>
            </div>
            <div>
                <h3>Upload images of your castle</h3>
                <input type="file" name="" id="" />
            </div>

            <button type="submit">Submit listing</button>
        </form>
    </div>
  )
}
export default ListingForm