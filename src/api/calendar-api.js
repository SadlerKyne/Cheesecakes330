/**
 * @fileoverview
 * Functions to interact with the Google Calendar API.
 * Supports both public read (API Key) and private write (OAuth).
 */

const API_KEY = "AIzaSyB47vwIoirKBJJswju0h4pvq6OBA_ifFSg";
const CLIENT_ID =
  "297099279801-k0jup4vr7lon225uvsc58p4t1h2s6ba0.apps.googleusercontent.com";
const CALENDAR_ID =
  "6104e981d3230c7d8aea53d366808e33133b935518757d65c3329a09713515e8@group.calendar.google.com";

// Scopes for reading and writing to the calendar
const SCOPES = "https://www.googleapis.com/auth/calendar";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

let tokenClient;
let gapiInited = false;
let gisInited = false;

// --- Public API Key Functions ---

/**
 * Fetches upcoming events by calling our own serverless function.
 * @returns {Promise<Array>} A list of event objects.
 */
export async function getUpcomingEvents() {
    try {
      // This path points to the serverless function we just created.
      const response = await fetch('/.netlify/functions/get-calendar-events');
      if (!response.ok) {
        throw new Error(`Serverless function failed: ${response.statusText}`);
      }
      const events = await response.json();
      return events;
    } catch (error) {
      console.error('Error fetching events from Netlify function:', error);
      return []; // Return an empty array on failure
    }
  }

// --- OAuth 2.0 Functions (for writing events) ---

window.gapiLoaded = () => gapi.load("client", initializeGapiClient);
window.gisLoaded = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: () => {}, // Callback is handled by the promise in authenticate()
  });
  gisInited = true;
};

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
  gapiInited = true;
}

/**
 * Authenticates the user with Google for calendar write access.
 * Returns a promise that resolves when authentication is complete.
 * @returns {Promise<void>}
 */
export function authenticate() {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      return reject(new Error("Google Identity Services not initialized."));
    }

    tokenClient.callback = (resp) => {
      if (resp.error) {
        return reject(resp);
      }
      resolve();
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  });
}

/**
 * Creates a new event on the baker's primary calendar.
 * @param {object} eventDetails - The details of the event to create.
 * @returns {Promise<object>} The created event object.
 */
export async function createCalendarEvent(eventDetails) {
  if (!gapi.client.getToken()) {
    throw new Error("User is not authenticated.");
  }

  const event = {
    summary: eventDetails.summary,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "America/Chicago",
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "America/Chicago",
    },
  };

  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  const response = await request;
  return response.result;
}