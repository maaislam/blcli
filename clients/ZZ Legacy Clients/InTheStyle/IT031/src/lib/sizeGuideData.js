export default (country) => {
  // ---------------------------------------------------------------
  // Data recently added US and EU and AUS - retains uk-only structure
  // with additional elms
  //
  // Note that AUS data is the same as UK data so just return the 
  // UK sizes object
  // ---------------------------------------------------------------
  const sizes = [
      {
        country: 'UK',
        size: {
          6: {
            bust: {
              inch: 31,
              cm: 79
            },
            waist: {
              inch: 24,
              cm: 61
            },
            hips: {
              inch: 34,
              cm: 86
            }
          },
          8: {
            bust: {
              inch: 32,
              cm: 81
            },
            waist: {
              inch: 25,
              cm: 64
            },
            hips: {
              inch: 35,
              cm: 89
            }
          },
          10: {
            bust: {
              inch: 34,
              cm: 86
            },
            waist: {
              inch: 27,
              cm: 69
            },
            hips: {
              inch: 37,
              cm: 94
            }
          },
          12: {
            bust: {
              inch: 36,
              cm: 91
            },
            waist: {
              inch: 29,
              cm: 74
            },
            hips: {
              inch: 39,
              cm: 99
            }
          },
          14: {
            bust: {
              inch: 38,
              cm: 99
            },
            waist: {
              inch: 31,
              cm: 79,
            },
            hips: {
              inch: 41,
              cm: 104
            }
          },
          16: {
            bust: {
              inch: 40,
              cm: 101
            },
            waist: {
              inch: 33,
              cm: 84,
            },
            hips: {
              inch: 43,
              cm: 109
            }
          },
          18: {
            bust: {
              inch: 42,
              cm: 106
            },
            waist: {
              inch: 35,
              cm: 89,
            },
            hips: {
              inch: 45,
              cm: 115
            }
          },
          20: {
            bust: {
              inch: 44,
              cm: 112
            },
            waist: {
              inch: 37,
              cm: 94,
            },
            hips: {
              inch: 47,
              cm: 120
            }
          },
          22: {
            bust: {
              inch: 46,
              cm: 117
            },
            waist: {
              inch: 39,
              cm: 99,
            },
            hips: {
              inch: 49,
              cm: 125
            }
          },
          24: {
            bust: {
              inch: 48,
              cm: 122
            },
            waist: {
              inch: 41,
              cm: 104,
            },
            hips: {
              inch: 51,
              cm: 130
            }
          },
          26: {
            bust: {
              inch: 50,
              cm: 127
            },
            waist: {
              inch: 43,
              cm: 109,
            },
            hips: {
              inch: 53,
              cm: 135
            }
          },
          28: {
            bust: {
              inch: 52,
              cm: 132
            },
            waist: {
              inch: 45,
              cm: 114,
            },
            hips: {
              inch: 55,
              cm: 140
            }
          }
        }
      },

      // US data
      {
        country: 'EU',
        size: {
          2: {
            bust: {
              inch: 31,
              cm: 79
            },
            waist: {
              inch: 24,
              cm: 61
            },
            hips: {
              inch: 34,
              cm: 86
            }
          },
          4: {
            bust: {
              inch: 32,
              cm: 81
            },
            waist: {
              inch: 25,
              cm: 64
            },
            hips: {
              inch: 35,
              cm: 89
            }
          },
          6: {
            bust: {
              inch: 34,
              cm: 86
            },
            waist: {
              inch: 27,
              cm: 69
            },
            hips: {
              inch: 37,
              cm: 94
            }
          },
          8: {
            bust: {
              inch: 36,
              cm: 91
            },
            waist: {
              inch: 29,
              cm: 74
            },
            hips: {
              inch: 39,
              cm: 99
            }
          },
          10: {
            bust: {
              inch: 38,
              cm: 99
            },
            waist: {
              inch: 31,
              cm: 79,
            },
            hips: {
              inch: 41,
              cm: 104
            }
          },
          12: {
            bust: {
              inch: 40,
              cm: 101
            },
            waist: {
              inch: 33,
              cm: 84,
            },
            hips: {
              inch: 43,
              cm: 109
            }
          },
          14: {
            bust: {
              inch: 42,
              cm: 106
            },
            waist: {
              inch: 35,
              cm: 89,
            },
            hips: {
              inch: 45,
              cm: 115
            }
          },
          16: {
            bust: {
              inch: 44,
              cm: 112
            },
            waist: {
              inch: 37,
              cm: 94,
            },
            hips: {
              inch: 47,
              cm: 120
            }
          },
          18: {
            bust: {
              inch: 46,
              cm: 117
            },
            waist: {
              inch: 39,
              cm: 99,
            },
            hips: {
              inch: 49,
              cm: 125
            }
          },
          20: {
            bust: {
              inch: 48,
              cm: 122
            },
            waist: {
              inch: 41,
              cm: 104,
            },
            hips: {
              inch: 51,
              cm: 130
            }
          },
          22: {
            bust: {
              inch: 50,
              cm: 127
            },
            waist: {
              inch: 43,
              cm: 109,
            },
            hips: {
              inch: 53,
              cm: 135
            }
          },
          24: {
            bust: {
              inch: 52,
              cm: 132
            },
            waist: {
              inch: 45,
              cm: 114,
            },
            hips: {
              inch: 55,
              cm: 140
            }
          }
        }
      },

      // EU data
      {
        country: 'US',
        size: {
          34: {
            bust: {
              inch: 31,
              cm: 79
            },
            waist: {
              inch: 24,
              cm: 61
            },
            hips: {
              inch: 34,
              cm: 86
            }
          },
          36: {
            bust: {
              inch: 32,
              cm: 81
            },
            waist: {
              inch: 25,
              cm: 64
            },
            hips: {
              inch: 35,
              cm: 89
            }
          },
          38: {
            bust: {
              inch: 34,
              cm: 86
            },
            waist: {
              inch: 27,
              cm: 69
            },
            hips: {
              inch: 37,
              cm: 94
            }
          },
          40: {
            bust: {
              inch: 36,
              cm: 91
            },
            waist: {
              inch: 29,
              cm: 74
            },
            hips: {
              inch: 39,
              cm: 99
            }
          },
          42: {
            bust: {
              inch: 38,
              cm: 99
            },
            waist: {
              inch: 31,
              cm: 79,
            },
            hips: {
              inch: 41,
              cm: 104
            }
          },
          44: {
            bust: {
              inch: 40,
              cm: 101
            },
            waist: {
              inch: 33,
              cm: 84,
            },
            hips: {
              inch: 43,
              cm: 109
            }
          },
          46: {
            bust: {
              inch: 42,
              cm: 106
            },
            waist: {
              inch: 35,
              cm: 89,
            },
            hips: {
              inch: 45,
              cm: 115
            }
          },
          48: {
            bust: {
              inch: 44,
              cm: 112
            },
            waist: {
              inch: 37,
              cm: 94,
            },
            hips: {
              inch: 47,
              cm: 120
            }
          },
          50: {
            bust: {
              inch: 46,
              cm: 117
            },
            waist: {
              inch: 39,
              cm: 99,
            },
            hips: {
              inch: 49,
              cm: 125
            }
          },
          52: {
            bust: {
              inch: 48,
              cm: 122
            },
            waist: {
              inch: 41,
              cm: 104,
            },
            hips: {
              inch: 51,
              cm: 130
            }
          },
          54: {
            bust: {
              inch: 50,
              cm: 127
            },
            waist: {
              inch: 43,
              cm: 109,
            },
            hips: {
              inch: 53,
              cm: 135
            }
          },
          56: {
            bust: {
              inch: 52,
              cm: 132
            },
            waist: {
              inch: 45,
              cm: 114,
            },
            hips: {
              inch: 55,
              cm: 140
            }
          }
        }
      }
    ];

    switch(country) {
        case 'uk':
            return sizes[0];
            break;
        case 'us':
            return sizes[1];
            break;
        case 'eu':
            return sizes[2];
            break;
        case 'au':
            return sizes[0]; // Same as UK size data
            break;
        default:
            return sizes[0];
    }
}
