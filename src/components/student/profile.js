import React, { useEffect, useState } from 'react';

function Profile() {
  const [studentProfile, setStudentProfile] = useState(null);

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const response = await fetch('/api/student/profile'); // Replace with your API endpoint
      const data = await response.json();
      setStudentProfile(data);
    } catch (error) {
      console.error('Error fetching student profile:', error);
    }
  };

  return (
    <div>
      <h1>Student Profile</h1>
      {studentProfile ? (
        <>
          <p>Name: {studentProfile.name}</p>
          <p>Age: {studentProfile.age}</p>
          <p>Major: {studentProfile.major}</p>
          {/* Add more information about the student */}
        </>
      ) : (
        <p>Loading student profile...</p>
      )}
    </div>
  );
}

export default Profile;
