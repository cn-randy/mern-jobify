export const JOB_STATUS = {
  PENDING: "pending",
  INRERVIEW: "interview",
  DECLINED: "declined",
};

export const JOB_TYPE = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  INTERNSHIP: "internship",
};

export const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
};
export const JOB_SORT_BY = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
};

export const TIME = {
  ONE_DAY_MS: 1000 * 60 * 60 * 24,
  TOKEN_EXPIRY: 90,
};

export const RATE_LIMITER = {
  TIMEOUT: 1000 * 60 * 15, //* 15 minutes
  MAX_REQUESTS: 15,
  MESSAGE: `IP rate limit exceeded. Try again in ${1000 * 60 * 15} minutes.`
};
