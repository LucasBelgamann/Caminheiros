import axios from "axios";
import { reactive } from "vue";

interface User {
  id: number;
  name: string;
  frequency: number;
}

interface Meeting {
  id: number;
  date: string;
  groupId: number;
  created_at: string;
  updated_at: string;
  groupName: string;
  users: User[];
}

export default class Users {
  data: {
    expanded: boolean;
    meetings: Meeting[];
    selectedUsers: User[];
  } = reactive({
    expanded: false,
    meetings: [],
    selectedUsers: [],
  });

  public async fetchMeetings() {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const user = JSON.parse(userData);
      try {
        const { data }: { data: Meeting[] } = await axios.get(
          `http://localhost:3001/meetings/recent/${user.groupId}`
        );
        if (data) {
          this.data.meetings = data;
          this.data.meetings.forEach((meeting) => {
            this.data.selectedUsers = meeting.users;
          });
        } else {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.error("Error fetching meeting:", error);
      }
    } else {
      console.error("User data not found in localStorage");
    }
  }
}
