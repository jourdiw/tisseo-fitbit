import { STATIONS } from "../common/globals.js"

console.log("Opening Tisseo Settings page");

let autoValues = [];
for (let key in STATIONS) {
  autoValues.push( {
    "name": STATIONS[key],
    "value": { code: key, direction: "n" }
  } );
}

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Tisseo Schedule</Text>}>
        <AdditiveList
          title="Select your favorite stations"
          settingsKey="favorite_station_setting"
          maxItems="5"
          addAction={
            <TextInput
              title="Add a Tisseo Station"
              label="Name"
              placeholder="Type something"
              action="Add Station"
              onAutocomplete={(value) => {
                return autoValues.filter((option) =>
                  option.name.toLowerCase().startsWith(value.toLowerCase()));
              }}
            />
          }
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
