import type { Meeting } from "./meeting.model.js";
import type { Member } from "./member.model.js";

export interface Attendance {
  id: string;
  memberId: string;
  meetingId: string;
  image: string;
  status: string;
  createdAt: Date;
}

export interface AttendanceWithMember extends Attendance {
  member: Member;
}

export interface AttendanceWithMeeting extends Attendance {
  meeting: Meeting;
}
