import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiServiceService } from './api-service.service';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiServiceService]
    });
    // Inject the service and the testing controller for HTTP requests
    service = TestBed.inject(ApiServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After each test, assert that there are no more pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a Wikipedia API request for search', () => {
    const searchData = 'some search term';
    
    // Mock response from the Wikipedia API
    const mockResponse = {
      query: {
        search: [{
          batchcomplete: "",
          continue: {
              sroffset: 10,
              continue: "-||"
          },
          query: {
              searchinfo: {
                  totalhits: 210
              },
              search: [
                  {
                      ns: 0,
                      title: "Craig Noone",
                      pageid: 18846922,
                      size: 22548,
                      wordcount: 1771,
                      snippet: "<span class=\"searchmatch\">Craig</span> Stephen <span class=\"searchmatch\">Noone</span> (born 17 November 1987) is an English professional footballer who plays as a winger for Bolton Wanderers. Born in Kirkby, he has also",
                      timestamp: "2018-11-02T22:25:45Z"
                  },
                  {
                      ns: 0,
                      title: "Noone",
                      pageid: 32906333,
                      size: 553,
                      wordcount: 64,
                      snippet: "<span class=\"searchmatch\">Noone</span> is a surname that may refer to:  <span class=\"searchmatch\">Craig</span> <span class=\"searchmatch\">Noone</span> (born 1987), English football midfielder Jimmie <span class=\"searchmatch\">Noone</span> (1895–1944), American jazz clarinetist Kathleen",
                      timestamp: "2015-08-16T05:16:17Z"
                  }
              ]
          }
      }]
      }
    };

    // Make the Wikipedia API request
    service.wikiSearch(searchData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Expect a single request to the Wikipedia API with the specified parameters
    const req = httpTestingController.expectOne(request => {
      return (
        request.url === service['url'] &&
        request.params.get('action') === 'query' &&
        request.params.get('format') === 'json' &&
        request.params.get('list') === 'search' &&
        request.params.get('srsearch') === searchData &&
        request.params.get('srlimit') === '1'
      );
    });

    it('should make a request to get launchpad data', () => {
      // Mock response for launchpad data
      const mockLaunchpadData = [
        {
        images: {
          large: [
            'https://i.imgur.com/xyz123.png',
          ],
        },
        name: 'Launchpad XYZ',
        full_name: 'XYZ Space Launch Complex',
        locality: 'XYZ City',
        region: 'XYZ Region',
        latitude: 40.123456,
        longitude: -90.987654,
        launch_attempts: 5,
        launch_successes: 3,
        rockets: [
          'rocketXYZ',
        ],
        timezone: 'UTC',
        launches: [],
        status: 'active',
        details: 'A newly constructed launchpad for upcoming space missions.',
        id: 'launchpadXYZ123'
      },
      {
        images: {
          large: [
            'https://i.imgur.com/123xyz.png',
          ],
        },
        name: 'Launchpad XYZ-2',
        full_name: 'XYZ Space Launch Complex 2',
        locality: 'XYZ City',
        region: 'XYZ Region',
        latitude: 40.543210,
        longitude: -91.876543,
        launch_attempts: 3,
        launch_successes: 2,
        rockets: [
          'rocketXYZ2',
        ],
        timezone: 'UTC',
        launches: [],
        status: 'active',
        details: 'A new launchpad facility to accommodate increased space mission demands.',
        id: 'launchpadXYZ987',
      }
      ];

      // Make the request for launchpad data
      service.getLaunchpadData().subscribe(response => {
        expect(response).toEqual(mockLaunchpadData);
      });
  
      // Expect a single request to the launchpads API
      const req = httpTestingController.expectOne(service['launchpadsUrl']);
  
      // Respond with the mock data
      req.flush(mockLaunchpadData);
    });

    it('should make a request to get launches data', () => {
      // Mock response for launches data
      const mockLaunchesData = [
        {
        fairings: {
          reused: true,
          recovery_attempt: true,
          recovered: true,
          ships: ["ship1", "ship2"],
        },
        links: {
          patch: {
            small: "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
            large: "https://images2.imgbox.com/5b/02/QcxHUb5V_o.png",
          },
          reddit: {
            campaign: "campaignLink",
            launch: "launchLink",
            media: "mediaLink",
            recovery: "recoveryLink",
          },
          flickr: {
            small: ["flickr1", "flickr2"],
            original: ["original1", "original2"],
          },
          presskit: "presskitLink",
          webcast: "https://www.youtube.com/watch?v=12345",
          youtube_id: "youtube12345",
          article: "https://www.space.com/launch2-article",
          wikipedia: "https://en.wikipedia.org/wiki/Launch2",
        },
        static_fire_date_utc: "2006-04-17T00:00:00.000Z",
        static_fire_date_unix: 1145253600,
        net: true,
        window: 1,
        rocket: "rocket2",
        success: true,
        failures: [
          {
            time: 45,
            altitude: null,
            reason: "engine failure",
            details: "Successful launch with some details",
          },
        ],
        crew: [],
        ships: ["ship3", "ship4"],
        capsules: ["capsule1", "capsule2"],
        payloads: ["payload1", "payload2"],
        launchpad: "launchpad2",
        flight_number: 2,
        name: "Launch2",
        date_utc: "2006-04-24T22:30:00.000Z",
        date_unix: 1146239400,
        date_local: "2006-04-25T10:30:00+12:00",
        date_precision: "hour",
        upcoming: false,
        cores: [
          {
            core: "core2",
            flight: 2,
            gridfins: true,
            legs: true,
            reused: true,
            landing_attempt: true,
            landing_success: true,
            landing_type: "land",
            landpad: "landpad2",
          },
        ],
        auto_update: true,
        tbd: false,
        launch_library_id: "library12345",
        id: "launch2ID",
      },
      {
        fairings: {
          reused: false,
          recovery_attempt: false,
          recovered: false,
          ships: [],
        },
        links: {
          patch: {
            small: "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
            large: "https://images2.imgbox.com/5b/02/QcxHUb5V_o.png",
          },
          reddit: {
            campaign: "campaign3Link",
            launch: "launch3Link",
            media: "media3Link",
            recovery: "recovery3Link",
          },
          flickr: {
            small: ["flickr3_1", "flickr3_2"],
            original: ["original3_1", "original3_2"],
          },
          presskit: "presskit3Link",
          webcast: "https://www.youtube.com/watch?v=67890",
          youtube_id: "youtube67890",
          article: "https://www.space.com/launch3-article",
          wikipedia: "https://en.wikipedia.org/wiki/Launch3",
        },
        static_fire_date_utc: "2006-05-17T00:00:00.000Z",
        static_fire_date_unix: 1147853600,
        net: false,
        window: 2,
        rocket: "rocket3",
        success: true,
        failures: [],
        crew: ["crew3_1", "crew3_2"],
        ships: ["ship5", "ship6"],
        capsules: ["capsule3_1", "capsule3_2"],
        payloads: ["payload3_1", "payload3_2"],
        launchpad: "launchpad3",
        flight_number: 3,
        name: "Launch3",
        date_utc: "2006-05-24T22:30:00.000Z",
        date_unix: 1148843400,
        date_local: "2006-05-25T10:30:00+12:00",
        date_precision: "hour",
        upcoming: false,
        cores: [
          {
            core: "core3",
            flight: 3,
            gridfins: true,
            legs: true,
            reused: false,
            landing_attempt: false,
            landing_success: null,
            landing_type: null,
            landpad: null,
          },
        ],
        auto_update: true,
        tbd: false,
        launch_library_id: "library67890",
        id: "launch3ID",
      }
    ];
  
      // Make the request for launches data
      service.getLaunchesData().subscribe(response => {
        expect(response).toEqual(mockLaunchesData);
      });
  
      // Expect a single request to the launches API
      const req = httpTestingController.expectOne(service['launchesUrl']);
  
      // Respond with the mock data
      req.flush(mockLaunchesData);
    });
    // Respond with the mock data
    req.flush(mockResponse);
  });
});
