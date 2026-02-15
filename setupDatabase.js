/**
 * Tuition Center LMS - Appwrite Database Setup
 * Run ONLY locally
 * NEVER expose API key to frontend
 */
// import sdk from 'node-appwrite'

import 'dotenv/config'
import  { Client, Databases, Permission, Role, IndexType } from 'node-appwrite'

/* -------------------- Client Setup -------------------- */

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY)

const databases = new Databases(client)
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID

/* -------------------- Helpers -------------------- */

async function safeCreate(fn, name) {
  try {
    await fn()
    console.log(`✓ ${name}`)
  } catch (err) {
    if (err.code === 409) {
      console.log(`• ${name} already exists`)
    } else {
      console.error(`✗ ${name}`, err.message)
      throw err
    }
  }
}

/* -------------------- Main Setup -------------------- */

async function setupDatabase() {
  console.log("\n🚀 Setting up Tuition Center LMS Database...\n");

  /* -------------------- USERS -------------------- */
  await safeCreate(
    () =>
      databases.createCollection(DATABASE_ID, "users", "Users", [
        Permission.read(Role.users()),
        Permission.update(Role.users()),
      ]),
    "Users collection",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(DATABASE_ID, "users", "name", 255, true),
    "users.name",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(DATABASE_ID, "users", "email", 255, true),
    "users.email",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(DATABASE_ID, "users", "role", 50, true),
    "users.role",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(DATABASE_ID, "users", "phone", 20, false),
    "users.phone",
  );

  await safeCreate(
    () =>
      databases.createIndex(
        DATABASE_ID,
        "users",
        "email_index",
        IndexType.Unique,
        ["email"],
      ),
    "users.email index",
  );

  /* -------------------- COURSES -------------------- */
  await safeCreate(
    () =>
      databases.createCollection(DATABASE_ID, "courses", "Courses", [
        Permission.read(Role.users()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
      ]),
    "Courses collection",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "courses",
        "title",
        255,
        true,
      ),
    "courses.title",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "courses",
        "description",
        5000,
        false,
      ),
    "courses.description",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "courses",
        "subject",
        100,
        true,
      ),
    "courses.subject",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "courses",
        "level",
        50,
        true,
      ),
    "courses.level",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "courses",
        "teacherId",
        50,
        true,
      ),
    "courses.teacherId",
  );

  await safeCreate(
    () =>
      databases.createIndex(
        DATABASE_ID,
        "courses",
        "teacher_index",
        IndexType.Key,
        ["teacherId"],
      ),
    "courses.teacherId index",
  );

  /* -------------------- LECTURES -------------------- */
  await safeCreate(
    () =>
      databases.createCollection(DATABASE_ID, "lectures", "Lectures", [
        Permission.read(Role.users()),
      ]),
    "Lectures collection",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "lectures",
        "title",
        255,
        true,
      ),
    "lectures.title",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "lectures",
        "courseId",
        50,
        true,
      ),
    "lectures.courseId",
  );

  await safeCreate(
    () =>
      databases.createDatetimeAttribute(
        DATABASE_ID,
        "lectures",
        "uploadedAt",
        true,
      ),
    "lectures.uploadedAt",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "lectures",
        "description",
        5000,
        false,
      ),
    "lectures.description",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "lectures",
        "videoUrl",
        255,
        false,
      ),
    "lectures.videoUrl",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "lectures",
        "fileId",
        50,
        false,
      ),
    "lectures.fileId",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "lectures",
        "fileName",
        255,
        false,
      ),
    "lectures.fileName",
  );

  // await databases.deleteAttribute(DATABASE_ID, "lectures", "duration");

  // await safeCreate(
  //   async () =>
  //     await databases.deleteAttribute(DATABASE_ID, "lectures", "duration"),
  //   "lectures.duration (delete old)",
  // );

  await safeCreate(
    async () =>
      await databases.createStringAttribute(
        DATABASE_ID,
        "lectures",
        "duration",
        60,
        true,
      ),
    "lectures.duration",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "lectures",
        "materials",
        5000,
        true,
      ),
    "lectures.materials",
  );

  await safeCreate(
    () =>
      databases.createIndex(
        DATABASE_ID,
        "lectures",
        "course_index",
        IndexType.Key,
        ["courseId"],
      ),
    "lectures.courseId index",
  );

  /* -------------------- ASSIGNMENTS -------------------- */
  await safeCreate(
    () =>
      databases.createCollection(DATABASE_ID, "assignments", "Assignments", [
        Permission.read(Role.users()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]),
    "Assignments collection",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "assignments",
        "title",
        255,
        true,
      ),
    "assignments.title",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "assignments",
        "description",
        5000,
        true,
      ),
    "assignments.description",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "assignments",
        "instruction",
        5000,
        true,
      ),
    "assignments.instruction",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "assignments",
        "totalMarks",
        4,
        true,
      ),
    "assignments.totalMarks",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "assignments",
        "courseId",
        50,
        true,
      ),
    "assignments.courseId",
  );
  await safeCreate(
    () =>
      databases.createDatetimeAttribute(
        DATABASE_ID,
        "assignments",
        "dueDate",
        true,
      ),
    "assignments.dueDate",
  );

  /* -------------------- ENROLLMENTS -------------------- */
  await safeCreate(
    () =>
      databases.createCollection(DATABASE_ID, "enrollments", "Enrollments", [
        Permission.read(Role.users()),
      ]),
    "Enrollments collection",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "enrollments",
        "studentId",
        50,
        true,
      ),
    "enrollments.studentId",
  );
  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "enrollments",
        "courseId",
        50,
        true,
      ),
    "enrollments.courseId",
  );

  await safeCreate(
    () =>
      databases.createIndex(
        DATABASE_ID,
        "enrollments",
        "unique_enrollment",
        IndexType.Unique,
        ["studentId", "courseId"],
      ),
    "enrollments unique index",
  );

  /* -------------------- ANNOUNCEMENTS -------------------- */
  await safeCreate(
    () =>
      databases.createCollection(
        DATABASE_ID,
        "announcements",
        "Announcements",
        [
          Permission.read(Role.users()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
        ],
      ),
    "Announcements collection",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "announcements",
        "title",
        255,
        true,
      ),
    "announcements.title",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "announcements",
        "content",
        5000,
        true,
      ),
    "announcements.content",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "announcements",
        "courseId",
        50,
        false,
      ),
    "announcements.courseId",
  );

  await safeCreate(
    () =>
      databases.createStringAttribute(
        DATABASE_ID,
        "announcements",
        "authorId",
        50,
        true,
      ),
    "announcements.authorId",
  );

  await safeCreate(
    () =>
      databases.createDatetimeAttribute(
        DATABASE_ID,
        "announcements",
        "createdAt",
        true,
      ),
    "announcements.createdAt",
  );

  await safeCreate(
    () =>
      databases.createIndex(
        DATABASE_ID,
        "announcements",
        "course_index",
        IndexType.Key,
        ["courseId"],
      ),
    "announcements.courseId index",
  );

  console.log("\n🎉 Database setup completed successfully!\n");
}




/* -------------------- Run -------------------- */

setupDatabase().catch(() => process.exit(1));

