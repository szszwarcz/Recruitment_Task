import { TestBed } from '@angular/core/testing';

import { DataPassingServiceService } from './data-passing-service.service';

describe('DataPassingServiceService', () => {
  let service: DataPassingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPassingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setSharedLaunchpads', () => {
    it('should set launchpads in local storage', () => {
      const mockLaunchpads = [
        {
          full_name: 'Kennedy Space Center Launch Complex 39A',
          details: 'Launch complex at Kennedy Space Center',
          images: 'image1.jpg',
          launches: ['launch1', 'launch2'],
          id: 'ksc_lc_39a',
          name: 'LC-39A',
          region: 'Florida',
          status: 'active',
          wikiLink: 'https://example.com/ksc_lc_39a',
          latitude: 28.56230196799018,
          longitude: -80.57735647504738,
        },
        {
          full_name: 'Vandenberg Space Force Base Space Launch Complex 4E',
          details: 'Launch complex at Vandenberg Space Force Base',
          images: 'image3.jpg',
          launches: ['launch3', 'launch4'],
          id: 'vafb_slc_4e',
          name: 'SLC-4E',
          region: 'California',
          status: 'retired',
          wikiLink: 'https://example.com/vafb_slc_4e',
          latitude: 34.632093782287846,
          longitude: -120.61082939941428,
        }
      ]
      service.setSharedLaunchpads(mockLaunchpads).subscribe(() => {
        service.setSharedLaunchpads(mockLaunchpads).subscribe(() => {
          const storedData = localStorage.getItem(service.getLaunchpadsStorageKey());
          expect(storedData).toBeTruthy();
          expect(JSON.parse(storedData || '')).toEqual(mockLaunchpads);
        })
      })
    }),

      it('should handle errors and log them correctly', () => {
        spyOn(console, 'error');
        const mockLaunchpads = [
          {
            full_name: 'Kennedy Space Center Launch Complex 39A',
            details: 'Launch complex at Kennedy Space Center',
            images: 'image1.jpg',
            launches: 'launch1',
            id: 'ksc_lc_39a',
            name: 'LC-39A',
            region: 'Florida',
            status: 'active',
            wikiLink: 'https://example.com/ksc_lc_39a',
            latitude: 28.56230196799018,
            longitude: -80.57735647504738,
          },
          {
            full_name: 'Vandenberg Space Force Base Space Launch Complex 4E',
            details: 'Launch complex at Vandenberg Space Force Base',
            images: ['image3.jpg', 'image4.jpg'],
            launches: ['launch3', 'launch4'],
            id: 'vafb_slc_4e',
            name: 'SLC-4E',
            region: 'California',
            status: 'retired',
            wikiLink: 'https://example.com/vafb_slc_4e',
            latitude: 34.632093782287846,
            longitude: -120.61082939941428,
          },
        ];
        service.setSharedLaunchpads(mockLaunchpads).subscribe(() => {
          expect(console.error).toHaveBeenCalledWith('Error saving launchpads:', jasmine.any(Error));
        });
      });
  })
  //----------------------------------------------------------------------
  describe('setSharedLaunches', () => {
    it('should set launches in local storage', () => {
      const mockLaunches = [
        {
          details: 'Launch details for the first mock launch',
          static_fire_date_utc: '2024-02-01T12:00:00Z',
          name: 'Mock Launch 1',
          id: 'mock_launch_1',
          launchpad:'ksc_lc_39a'

        },
        {
          details: 'Launch details for the second mock launch',
          static_fire_date_utc: '2024-02-05T15:30:00Z',
          name: 'Mock Launch 2',
          id: 'mock_launch_2',
          launchpad: 'vafb_slc_4e',
          
        }
      ];
      service.setSharedLaunches(mockLaunches).subscribe(() => {
        service.setSharedLaunches(mockLaunches).subscribe(() => {
          const storedData = localStorage.getItem(service.getLaunchesStorageKey());
          expect(storedData).toBeTruthy();
          expect(JSON.parse(storedData || '')).toEqual(mockLaunches);
        })
      })
      }),

      it('should handle errors and log them correctly', () => {
        spyOn(console, 'error');
        const mockLaunches = [
          {
            details: 'Launch details for the first mock launch',
            static_fire_date_utc: '2024-02-01T12:00:00Z',
            name: 'Mock Launch 1',
            id: 'mock_launch_1',
            launchpad:'ksc_lc_39a'
  
          },
          {
            details: 'Launch details for the second mock launch',
            static_fire_date_utc: '2024-02-05T15:30:00Z',
            name: 'Mock Launch 2',
            id: 'mock_launch_2',
            launchpad: 'vafb_slc_4e',
            
          }
        ];
        service.setSharedLaunches(mockLaunches).subscribe(() => {
          expect(console.error).toHaveBeenCalledWith('Error saving launches:', jasmine.any(Error));
        });
      });
    })

  describe('getSharedLaunchpads', () => {
    it('should return all launchpads stored in the local storage', () =>{
      const mockLaunchpads = [
        {
          full_name: 'Kennedy Space Center Launch Complex 39A',
          details: 'Launch complex at Kennedy Space Center',
          images: 'image1.jpg',
          launches: ['launch1', 'launch2'],
          id: 'ksc_lc_39a',
          name: 'LC-39A',
          region: 'Florida',
          status: 'active',
          wikiLink: 'https://example.com/ksc_lc_39a',
          latitude: 28.56230196799018,
          longitude: -80.57735647504738,
        },
        {
          full_name: 'Vandenberg Space Force Base Space Launch Complex 4E',
          details: 'Launch complex at Vandenberg Space Force Base',
          images: 'image3.jpg',
          launches: ['launch3', 'launch4'],
          id: 'vafb_slc_4e',
          name: 'SLC-4E',
          region: 'California',
          status: 'retired',
          wikiLink: 'https://example.com/vafb_slc_4e',
          latitude: 34.632093782287846,
          longitude: -120.61082939941428,
        }
      ]
      
      service.setSharedLaunchpads(mockLaunchpads).subscribe();
      
      service.getSharedLaunchpads().subscribe(data => {
        const storedData = localStorage.getItem(service.getLaunchpadsStorageKey());
        expect(data).toBeTruthy();
        expect(JSON.parse(storedData || '')).toEqual(data);
      })
    })
  })
  //------------------------------------------------------------------------------
  describe('getSharedLaunches', () => {
    it('should return all launches stored in the local storage', () =>{
      const mockLaunches = [
        {
          details: 'Launch details for the first mock launch',
          static_fire_date_utc: '2024-02-01T12:00:00Z',
          name: 'Mock Launch 1',
          id: 'mock_launch_1',
          launchpad:'ksc_lc_39a'

        },
        {
          details: 'Launch details for the second mock launch',
          static_fire_date_utc: '2024-02-05T15:30:00Z',
          name: 'Mock Launch 2',
          id: 'mock_launch_2',
          launchpad: 'vafb_slc_4e',
          
        }
      ];
      service.setSharedLaunches(mockLaunches).subscribe();

      service.getSharedLaunches().subscribe(data => {
        const storedData = localStorage.getItem(service.getLaunchesStorageKey());
        expect(data).toBeTruthy();
        expect(JSON.parse(storedData || '')).toEqual(data);
      })
    })
  })

  describe('getLaunchpadById',() => {
    it('should return launchpad with matching id', () => {
      const mockLaunchpads = [
        {
          full_name: 'Kennedy Space Center Launch Complex 39A',
          details: 'Launch complex at Kennedy Space Center',
          images: 'image1.jpg',
          launches: ['launch3', 'launch4'],
          id: 'ksc_lc_39a',
          name: 'LC-39A',
          region: 'Florida',
          status: 'active',
          wikiLink: 'https://example.com/ksc_lc_39a',
          latitude: 28.56230196799018,
          longitude: -80.57735647504738,
        },
        {
          full_name: 'Vandenberg Space Force Base Space Launch Complex 4E',
          details: 'Launch complex at Vandenberg Space Force Base',
          images: 'image3.jpg',
          launches: ['launch3', 'launch4'],
          id: 'vafb_slc_4e',
          name: 'SLC-4E',
          region: 'California',
          status: 'retired',
          wikiLink: 'https://example.com/vafb_slc_4e',
          latitude: 34.632093782287846,
          longitude: -120.61082939941428,
        },
      ];
      service.setSharedLaunchpads(mockLaunchpads).subscribe();
      const mockId = "ksc_lc_39a";
      const expectedResult = {
        full_name: 'Kennedy Space Center Launch Complex 39A',
        details: 'Launch complex at Kennedy Space Center',
        images: 'image1.jpg',
        launches: ['launch3', 'launch4'],
        id: 'ksc_lc_39a',
        name: 'LC-39A',
        region: 'Florida',
        status: 'active',
        wikiLink: 'https://example.com/ksc_lc_39a',
        latitude: 28.56230196799018,
        longitude: -80.57735647504738,
      };
      service.getLaunchpadById(mockId).subscribe(data => {
        expect(data).toEqual(expectedResult);
      });
    }),
    it('should return null when local storage is empty', () => {

      const mockLaunchpads: any[] = [];

      service.setSharedLaunchpads(mockLaunchpads).subscribe();
      const mockId = 'ksc_lc_39a'
      service.getLaunchpadById(mockId).subscribe((result) => {
        expect(result).toBeNull();
      });
    });
  })

  describe('getLaunchpadByNameAndRegion',() => {
    it('should return launchpad with matching name and with matching region', () => {
      const mockLaunchpads = [
        {
          full_name: 'Kennedy Space Center Launch Complex 39A',
          details: 'Launch complex at Kennedy Space Center',
          images: 'image1.jpg',
          launches: ['launch3', 'launch4'],
          id: 'ksc_lc_39a',
          name: 'LC-39A',
          region: 'Florida',
          status: 'active',
          wikiLink: 'https://example.com/ksc_lc_39a',
          latitude: 28.56230196799018,
          longitude: -80.57735647504738,
        },
        {
          full_name: 'Vandenberg Space Force Base Space Launch Complex 4E',
          details: 'Launch complex at Vandenberg Space Force Base',
          images: 'image3.jpg',
          launches: ['launch3', 'launch4'],
          id: 'vafb_slc_4e',
          name: 'SLC-4E',
          region: 'California',
          status: 'retired',
          wikiLink: 'https://example.com/vafb_slc_4e',
          latitude: 34.632093782287846,
          longitude: -120.61082939941428,
        },
      ];
      service.setSharedLaunchpads(mockLaunchpads).subscribe();

      const nameToMatch = 'LC-39A'
      const regionToMatch = 'Florida'
      const launchpadToMatch = [{
        full_name: 'Kennedy Space Center Launch Complex 39A',
        details: 'Launch complex at Kennedy Space Center',
        images: 'image1.jpg',
        launches: ['launch3', 'launch4'],
        id: 'ksc_lc_39a',
        name: 'LC-39A',
        region: 'Florida',
        status: 'active',
        wikiLink: 'https://example.com/ksc_lc_39a',
        latitude: 28.56230196799018,
        longitude: -80.57735647504738,
      }];

      service.getLaunchpadsByNameAndRegion(regionToMatch, nameToMatch).subscribe(data => {
        expect(data).toEqual(launchpadToMatch);
      });
    }),

    it('should return null when local storage is empty', () => {
      const mockLaunchpads : any[] = [];
      service.setSharedLaunchpads(mockLaunchpads).subscribe();
      const nameToMatch = 'LC-39A'
      const regionToMatch = 'Florida'
      service.getLaunchpadsByNameAndRegion(regionToMatch,nameToMatch).subscribe((result) => {
        expect(result === null || result.length === 0).toBe(true);
      });
      });
    })
  })

