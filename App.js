import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Linking, Pressable } from 'react-native';
import useAbortableFetch from './hooks/FetchHook';
import { useEffect, useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import getWeekNumber from './components/weekdays';

export default function App() {
  const date = new Date()
  const day = getWeekNumber(date)
  console.log(day)
  const [week, setWeek] = useState(day);
  const urlRef = useRef();
  const { data, loading, error } = useAbortableFetch(
    urlRef.current ? urlRef.current : `https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=${day}&s=2024-2025`
  );
  

  useEffect(() => {
    searchGamesByWeek(week);
  }, []);

  const searchGamesByWeek = (week) => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=${week}&s=2024-2025`;
    urlRef.current = url;
  };

  const handleVideoPress = (url) => {
    Linking.openURL(url);
  };

  const formatTimestamp = (timestamp) => {
    const eventDate = new Date(timestamp);
    const finnishTime = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000)
    return format(finnishTime, 'd.M.yyyy HH:mm', { locale: fi });
  };

  return (
    <View style={styles.container}>
        {data && data.events && data.events.length > 0 && (
          <Image source={{ uri: data.events[0].strLeagueBadge }} style={styles.leaguebadge}/>
        )}
      <Text style={styles.heading}>Valioliigan ottelut 2024-2025</Text>
      <Picker
        selectedValue={week}
        style={styles.picker}
        onValueChange={(itemValue) => {
          searchGamesByWeek(itemValue);
          setWeek(itemValue);
        }}
      >
        {Array.from({ length: 38 }, (_, i) => i + 1).map((weekNumber) => (
          <Picker.Item key={weekNumber} label={`Viikko ${weekNumber}`} value={weekNumber} />
        ))}
      </Picker>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Ladataan otteluita...</Text>
          </View>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : data?.events ? (
          data.events
            .sort((a, b) => new Date(a.strTimestamp) - new Date(b.strTimestamp))
            .map((game) => (
              <View key={game.idEvent} style={styles.gameContainer}>
                <View style={styles.TeamBadges}>
                  <View style = {styles.team}>
                    <Image source={{ uri: game.strHomeTeamBadge }} style={styles.badge} />
                    <Text style={styles.teamText}>
                      {game.intHomeScore}
                    </Text>
                    {/*<Text style={styles.teamText}>
                      {game.strHomeTeam}
                    </Text>*/}
                  </View>
                  <View style = {styles.team}>
                    <Image source={{ uri: game.strAwayTeamBadge }} style={styles.badge} />
                    <Text style={styles.teamText}>
                      {game.intAwayScore} 
                    </Text>
                    {/*<Text style={styles.teamText}>
                     {game.strAwayTeam}
                    </Text>*/}
                  </View>
                </View>
                <Text style={styles.timestamp}>{formatTimestamp(game.strTimestamp)}</Text>
                <Text style={styles.venue}>{game.strVenue}</Text>
                {game.strVideo ? (
                  <TouchableOpacity onPress={() => handleVideoPress(game.strVideo)}>
                    <Text style={styles.videoLink}>Katso video</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.noVideo}></Text>
                )}
              </View>
            ))
        ) : (
          <Text>No games found</Text>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 8,
  },
  scrollView: {
    width: '100%',
    alignContent: 'center',
  },
  gameContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginVertical: 8,
  },
  team: {
    flexDirection: "column",
    alignItems: "center",
    badding: 0,
  },
  leaguebadge: {
    width: 800,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 4
  },
  teamText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 0,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  venue: {
    fontSize: 14,
    color: '#333',
  },
  videoLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  noVideo: {
    fontSize: 14,
    color: '#999',
  },
  TeamBadges: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',

  },
});
