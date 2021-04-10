using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Xml;
using aspnetcore.Repositories.DTOs;

namespace aspnetcore.Services.Models
{
    public class LessonJourneyModel
    {
        public int ID { get; set; }

        public int ID_account { get; set; }

        public int Times { get; set; }

        public DateTime FirstDate { get; set; }

        public string Level { get; set; }

        public List<ExpandoObject> ArrayLesson { get; set; }

        public int ExerciseID { get; set; }

        public LessonJourneyModel()
        {
        }

        public LessonJourneyModel(LessonQueryDTO dto)
        {
            ID = dto.ID;
            ID_account = dto.ID_account;
            Times = dto.Times;
            FirstDate = dto.FirstDate;
            Level = dto.Level;

            if (ArrayLesson == null) ArrayLesson = new List<ExpandoObject>();

            string[] lessonCodes = dto.LessonsID.Split(',');
            foreach (var code in lessonCodes)
            {
                string[] keyvalue = code.Split('-');
                dynamic dynObject = new ExpandoObject();
                dynObject.key = keyvalue[0];
                dynObject.value = keyvalue[1];

                ArrayLesson.Add (dynObject);
            }

            ExerciseID = dto.ExerciseID;
        }
    }
}
