-- use awakecup database
USE `awakecup`;
--
-- Create tables
-- 

-- grammar_topics table
DROP TABLE IF EXISTS `gram_topics`;
CREATE TABLE `gram_topics` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(64) NOT NULL,
    `Level` VARCHAR(16) NOT NULL,
    `ImageURL` VARCHAR(256) NOT NULL DEFAULT 'default.png',
    `Description` VARCHAR(1024) NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- vocabulary_topics table
DROP TABLE IF EXISTS `vocab_topics`;
CREATE TABLE `vocab_topics` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(32) NOT NULL,
    `Level` VARCHAR(16) NOT NULL,
    `ImageURL` VARCHAR(256) NOT NULL DEFAULT 'default.png',
    `Description` VARCHAR(1024) NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- Grammar_Post_Section table
DROP TABLE IF EXISTS `gram_post_section`;
CREATE TABLE `gram_post_section` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `ID_topic` INT NOT NULL,
    `Title` VARCHAR(64) NOT NULL,
    `Formular` VARCHAR(256) NOT NULL,
    `Usage` VARCHAR(1024) NOT NULL DEFAULT 'default.png',
    `Note` VARCHAR(256) NOT NULL DEFAULT 0,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- Grammar_Post_Section_Example table
DROP TABLE IF EXISTS `gram_post_section_example`;
CREATE TABLE `gram_post_section_example` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `ID_section` INT NOT NULL,
    `ImageURL` VARCHAR(1024) NOT NULL DEFAULT 'default.png',
    `Example` VARCHAR(1024) NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- vocab_by_topic table
DROP TABLE IF EXISTS `vocab_by_topic`;
CREATE TABLE `vocab_by_topic` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `ID_topic` INT NOT NULL,
    `En` VARCHAR(32) NOT NULL, 
    `IPA` VARCHAR(32) NOT NULL, 
    `SoundURL` VARCHAR(256) NOT NULL,
    `Type` VARCHAR(16) NOT NULL,
    `Vn` VARCHAR(32) NOT NULL,
    `Example1` VARCHAR(256) NOT NULL,
    `Example2` VARCHAR(256) NOT NULL,
    `ImageURL` VARCHAR(1024) NOT NULL DEFAULT 'default.png',    
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- quiz table
DROP TABLE IF EXISTS `quiz`;
CREATE TABLE `quiz` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(64) NOT NULL,    
    `Level` VARCHAR(32) NOT NULL,
    `Description` VARCHAR(1024) NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- quiz_question table
DROP TABLE IF EXISTS `quiz_question`;
CREATE TABLE `quiz_question` (
    `ID` INT NOT NULL AUTO_INCREMENT,    
    `ID_quiz` INT NOT NULL,
    `question` VARCHAR(256) NOT NULL,    
    `questionType` VARCHAR(16) NOT NULL,
    `questionPic` VARCHAR(256),
    `answerSelectionType` VARCHAR(16) NOT NULL,
    `answers` VARCHAR(1024) NOT NULL,   
    `correctAnswer` VARCHAR(16) NOT NULL,
    `explanation` VARCHAR(256),
    PRIMARY KEY (`ID`)
);

-- userInfo table
DROP TABLE IF EXISTS `userInfo`;
CREATE TABLE `userInfo` (
    `ID` INT NOT NULL AUTO_INCREMENT,    
    `ID_account` INT NOT NULL,
    `Name` VARCHAR(64) NOT NULL,     
    `Email` VARCHAR(64) NOT NULL,        
    `Phone` VARCHAR(64),  
    `Image` VARCHAR(1024) NOT NULL DEFAULT 'default.png',    
    `Address` VARCHAR(1024),     
    `About` VARCHAR(1024), 
    PRIMARY KEY (`ID`)
);

-- user_scoreInfo table
DROP TABLE IF EXISTS `user_scoreInfo`;
CREATE TABLE `user_scoreInfo` (
    `ID` INT NOT NULL AUTO_INCREMENT,    
    `ID_account` INT NOT NULL,    
    `Score` INT NOT NULL DEFAULT 0,      
    `PostLeft` INT NOT NULL DEFAULT 20, 
    `Level` VARCHAR(4) NOT NULL DEFAULT "A1",
    PRIMARY KEY (`ID`)
);

-- question table
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
    `ID` INT NOT NULL AUTO_INCREMENT,    
    `Question` VARCHAR(64) NOT NULL,    
    `Topic` VARCHAR(16) NOT NULL,
    `Detail` VARCHAR(1024) NOT NULL,         
    `ID_account` INT NOT NULL,    
    `Time` DATETIME,              
    `NumberOfAnswer` INT NOT NULL DEFAULT 0,   
    PRIMARY KEY (`ID`)
);
-- answer table
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
    `ID` INT NOT NULL AUTO_INCREMENT,     
    `ID_question` INT NOT NULL,
    `Detail` VARCHAR(1024) NOT NULL,         
    `ID_account` INT NOT NULL,    
    `Time` DATETIME,               
    PRIMARY KEY (`ID`)
);


--
-- Insert Data
--

-- gram_topics table
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Present simple tense","Basic","https://englishclassviaskype.com/wp-content/uploads/2019/12/Present-simple-explained-in-pictures.png","The present simple tense isn't always so simple for learners but I promise this explanation will make things much clearer. In this section, we'll look at the different uses of the present tense");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Present continuous tense","Basic","https://i.ytimg.com/vi/lPY9sYK5S5A/maxresdefault.jpg","This tense is formed using the auxiliary verb have/has plus the past participle of the verb be (been) plus the -ing form of the main verb. We'll learn how to make positive and negative forms, short forms (contractions) and questions");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Present perfect tense","Elementary","https://i.ytimg.com/vi/SSIZidvE-lc/maxresdefault.jpg","Present perfect tense is one of the commonly used verb tenses in English. It describes unfinished actions, experiences or actions without a definite time in the past");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Present perfect continuous tense","Intermediate","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRXUkl_tcFZX2zy3fUgwPe666q0cFth-mwAeg&usqp=CAU", "We use the Present Perfect Continuous to emphasise the duration or continuous course of an action");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Past simple tense","Basic", "https://vskills.in/certification/blog/wp-content/uploads/2014/11/past-an-opportunity-or-an-obstacle.png", "An age old habit of humans is the reminiscence of the past. We keep the memories of the past intact to us wishing if we could have changed things");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Past continuous tense","Basic", "https://i.ytimg.com/vi/UeKZ6Mm-SlY/maxresdefault.jpg", "Past continuous tense is used to express a continued or ongoing action in past or to indicate that longer action in the past was interrupted");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Past perfect tense","Elementary", "https://i.ytimg.com/vi/-TrE6VdtgLE/maxresdefault.jpg", "The Past Perfect is a verb tense used to express actions that occurred in the past and finished before another action in the past");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Past perfect continuous tense","Intermediate", "https://i.ytimg.com/vi/A3HRUtZCAa4/maxresdefault.jpg", "The Past Perfect Continuous tense or Past Perfect Progressive shows that an action that started in the past continued up until another time in the past");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Simple future tense","Basic", "https://i.ytimg.com/vi/vjoZvhzWfxI/maxresdefault.jpg", "Simple Future Tense! In this section, we will be looking at the various rules surrounding the use of the simple future tense and delving into much greater");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Future continuous tense","Basic", "https://i.ytimg.com/vi/eOs0cZ12Fhk/maxresdefault.jpg", "In the same way as with the future simple, usually we use the short form (‘ll be verb-ing) when we are speaking");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Future perfect tense","Elementary", "https://i1.wp.com/examplanning.com/wp-content/uploads/2019/07/Future-Perfect-Tense-Copy-min.jpg?fit=1349%2C811&ssl=1", "The future perfect tense in English with future perfect examples. Learn the definition and how to form the future perfect tense with useful examples");
INSERT INTO `gram_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Future perfect continuous tense","Intermediate", "https://i0.wp.com/examplanning.com/wp-content/uploads/2019/08/Future-perfect-continuous-tense-2-min.jpg?fit=1387%2C831&ssl=1", "The past future continuous is similar to the future perfect, except that it expresses longer actions in the future before another action in the future");


-- Grammar_Post_Section table
INSERT INTO `gram_post_section` (`ID_topic`,`Title`,`Formular`,`Usage`,`Note`) VALUES ("1","Khẳng định","<b>S + V-s-es</b> (S = He/She/It) <br><b>S + V-1</b> (S = I/We/You/They)","Thói quen hoặc hành động lặp đi lặp lại ở hiện tại <br>Chân lí, sự thật hiển nhiên <br>Nhận thức, cảm giác hoặc tình trạng ở hiện tại <br>Việc sẽ xảy ra trong tương lai. Cách này để nói về thời gian biểu hoặc những kế hoạch đã cố định thời gian","Cách dùng hiện tại đơn cho tương lai chỉ phổ biến ở Mỹ");
INSERT INTO `gram_post_section` (`ID_topic`,`Title`,`Formular`,`Usage`) VALUES ("1","Phủ định","Be thêm not<br>Don’t/dosen’t + bare-inf","Dùng trong các tình huống tương tự ở hiện tại và mang sắc thái phủ định - không....");
INSERT INTO `gram_post_section` (`ID_topic`,`Title`,`Formular`,`Usage`) VALUES ("1","Nghi vấn","Be + S …? <br>Do/Does + S + bare-inf …?","Dùng để đặt câu hỏi trong các tình huống tương tự ở hiện tại - Có....không");


INSERT INTO `gram_post_section` (`ID_topic`,`Title`,`Formular`,`Usage`,`Note`) VALUES ("2","Khẳng định","S +  be + V-ing","Nói về thứ đang diễn ra ngay lúc nói <br>Tương lai gần, diễn ra theo kế hoạch <br> Hành động lặp đi lặp lại gây khó chịu","Hành động khác với mọi ngày (dùng phổ biến ở Anh)");
INSERT INTO `gram_post_section` (`ID_topic`,`Title`,`Formular`,`Usage`) VALUES ("2","Phủ định","S + be-(not) + V-ing","Dùng trong các tình huống tương tự ở hiện tại và mang sắc thái phủ định - đang không....");
INSERT INTO `gram_post_section` (`ID_topic`,`Title`,`Formular`,`Usage`) VALUES ("2","Nghi vấn","Be + S + V-ing ?","Dùng để đặt câu hỏi trong các tình huống tương tự ở hiện tại - Có đang....không");

-- Grammar_Post_Section_Examples table
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("1","https://i.pinimg.com/564x/01/03/32/01033283c9739f9a52342b05449432d0.jpg","I get up early every day");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("1","https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/t7qcoofhx03zb81hwqvs/make-world-travel-logo-animation-in-hd-quality.png","They travel to their country house every weekend");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("1","https://s3.envato.com/files/257567729/u_-9437.jpg","A dog has four legs");


INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("2","https://previews.123rf.com/images/viyada123rf/viyada123rf1901/viyada123rf190100050/136946423-older-sister-and-sisters-are-shooting-in-the-frame-the-little-girl-and-the-younger-sister-together-b.jpg","My litter sister isn’t tall");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("2","https://userscontent2.emaze.com/images/a65173ce-f20a-41bb-9919-1c86f51fa153/ab1b389d8f780d4ec87f4c4527fb0b43.jpeg","I am not from China");

INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("3","https://ed.stanford.edu/sites/default/files/news_images/math-pic.jpg","The class starts next week?");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("3","https://www.pta.co.uk/media/183726/faq-film-licensing-licences-keep-legal.jpg","What time does the film begin?");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("3","https://cdn.vox-cdn.com/thumbor/f5ldj3wMceQrXrumF00K-Ys9PGk=/0x0:2048x1425/1400x1050/filters:focal(817x529:1143x855):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66352000/emma5.0.jpg","Is she beautiful?");

INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("4","https://giftideasforwriters.com/wp-content/uploads/2016/04/book-inscription-ideas.jpg","I am writing a new book");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("4","https://i.insider.com/5e2b0c0ab6d52d0e44040fc4?width=481&format=jpeg","She <b>is working</b> at shop for 6 weeks");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("4","https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/fc/3055107-poster-p-1-federal-law-now-says-kids-can-walk-to-school-alone.jpg","I usually go to school by bike, but I <b>am walking</b> to school.");

INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("5","https://polyglotclub.com/image/help/14207361761.jpg","My English is not improving");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("5","https://prod.static9.net.au/_/media/2018/09/19/11/13/lazy_woman_couch.jpg","I am not working now");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("5","https://missmuslimah9.files.wordpress.com/2016/12/no-television.jpeg","He isn’t watching TV now");

INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("6","https://edsurge.imgix.net/uploads/post/image/13510/Shutterstock_miniwide-1593721576.png?auto=compress%2Cformat&w=640&h=259&fit=crop","what are you doing tomorrow?");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("6","https://www.wikihow.com/images/thumb/8/82/Make-Friends-in-College-Step-15.jpg/v4-460px-Make-Friends-in-College-Step-15.jpg.webp","Is he going out with you?");
INSERT INTO `gram_post_section_example` (`ID_section`,`ImageURL`,`Example`) VALUES ("6","https://www.kiers.com/wp-content/uploads/2017/06/homework-2.jpg","Are you doing your homework?");


-- vocab_topics table
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Fruits","Basic","https://www.englishclub.com/images/vocabulary/food/fruits/fruits.jpg","Fruits contain seeds or a stone, and they can be eaten raw after becoming ripe. Some of the most popular and delicious fruits are tropical fruits like pineapples, bananas, mangoes, papayas and mangosteens");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Vegetables","Basic","https://www.englishclub.com/images/vocabulary/food/vegetables/vegetables.jpg","One type of food that nearly everyone eats every day is the food group called vegetables. Some vegetables grow underground, including root vegetables like potatoes, yams, carrots, turnips and beetroot as well as bulbs like onion and garlic");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Fish and Seafood","Elementary","https://www.englishclub.com/images/vocabulary/food/fish-seafood/fish-seafood.jpg","Another important type of food is seafood, which includes many kinds of fish as well as shellfish and other sea creatures like squid");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Restaurant","Intermediate","https://www.englishclub.com/images/vocabulary/food/restaurants/restaurant.jpg", "Most people eat out quite often, even if they like cooking and eating at home. They might eat breakfast or lunch in a cafeteria or canteen where they work or study, or go to a café or restaurant nearby");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Kitchens and Kitchenware","Basic", "https://www.englishclub.com/images/vocabulary/food/kitchen/kitchen.jpg", "Kitchens have their own specially-designed fixtures and electric appliances as well as many smaller items of kitchenware for preparing and cooking food and making drinks");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Movies","Basic", "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/hos-best-horror-posters-intro.jpg", "Movies can be divided into several different genres. There are exciting action movies with gun fights and car chases, and horror movies that make us jump in our seats");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Planets","Elementary", "https://www.englishclub.com/efl/wp-content/uploads/2017/03/solar-system.png", "The planet Earth on which we live is part of the solar system. The Sun is a star at the centre of the solar system, and eight planets and other bodies revolve around it");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Criminals","Intermediate", "https://policecommissioner.net/wp-content/uploads/2020/05/Most-wanted-.jpg", "Most countries have laws (official rules set by the government). When people disobey the Law, and we call such people law breakers or criminals. Breaking the law is a crime");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Jobs","Basic", "https://latinx.com/wp-content/uploads/2019/06/image-url-42.jpg", "One meaning of job is a paid position in regular employment. For example, you may have a job as a teacher, or a dentist, or a taxi-driver");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Colours","Basic", "https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/SUC/color1-20191204062437970.jpg", "The seven colours of the rainbow are the visible part of the electro-magnetic spectrum - they are visible to (or can be seen by) the human eye");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Animal","Elementary", "https://media1.fdncms.com/ntslo/imager/u/original/8657532/musicartsculture_movies1-1-f9c79f2f7ef0a197.jpg", "Below you'll find typical terms that we use to refer to some of the more common animals on Planet Earth. The collective terms describe groups of the animal and are also known as terms of venery");
INSERT INTO `vocab_topics` (`Title`, `Level`, `ImageURL`, `Description`) VALUES ("Medical","Intermediate", "https://www.tomorrowmakers.com/sites/default/files/2019-08/Medical%20Aid%20Abroad.jpg", "Here is some essential vocabulary for nurses and medical professionals working in an English-speaking context. Each word is shown with its part of speech and meaning, while an example sentence shows the word in context");


-- vocab_by_topic table
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","apple","ˈæpəl","https://www.ldoceonline.com/media/english/breProns/brelasdeapple.mp3?version=1.2.11","noun","quả táo","Gently I reach to the side and pluck an apple off the tree, then drop it","If you have one rotten apple in the bunch, it impacts the others","https://5.imimg.com/data5/HF/CW/MY-51857835/organic-apple-fruit-500x500.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","banana","bəˈnɑːnə","https://www.ldoceonline.com/media/english/breProns/brelasdebanana.mp3?version=1.2.11","noun","quả chuối","The leader either numbers each pair or gives them names such as apple, banana, cake, or other fruit","They brought bananas to Africathey had boats, they travelled","https://img1.mashed.com/img/gallery/heres-what-happens-when-you-eat-a-banana-every-day/intro-1596497583.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","coconut","ˈkəʊkənʌt","https://www.ldoceonline.com/media/english/breProns/coconut0205.mp3?version=1.2.11","noun","trái dừa","He canna climb up a tree for a coconut, he canna go up the mountain for wild bananas","As easy as tossing a coconut into the ocean or finding a fat man's belly with the suntan lotion","https://www.plantgrower.org/uploads/6/5/5/4/65545169/published/coconut-white-balsamic-condimento.jpg?1515168579");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","peach","piːtʃ","https://www.ldoceonline.com/media/english/breProns/brelasdepeach.mp3?version=1.2.11","noun","trái đào","Then why not just eat a peach? we asked","So he raced from dogwood to blossoming peach","https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f42b5182138dffac9bf05b7%2F0x0.jpg%3FcropX1%3D549%26cropX2%3D8140%26cropY1%3D0%26cropY2%3D5693");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","grape","ɡreɪp","https://www.ldoceonline.com/media/english/breProns/grape0205.mp3?version=1.2.11","noun","chùm nho","He stood at the window eating grapes from a paper bag torn open down the side","a bunch of grapes","https://images.ctfassets.net/cnu0m8re1exe/6uSVPiUx1FloQ23j38x2aM/0eafe5c0d6b3ce7e3aae6b389a997423/Grapes.jpg?w=650&h=433&fit=fill");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","grapefruit","ˈɡreɪpfruːt","https://www.ldoceonline.com/media/english/breProns/grapefruit0205.mp3?version=1.2.11","noun","trái bưởi","A mature grapefruit tree can produce 250 grapefruit","The sweeter, more nutritious, relatively new varieties of ruby grapefruit made for fine eating at home","https://i.ndtvimg.com/mt/cooks/2014-11/grapefruit.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","lemon","ˈlemən","https://www.ldoceonline.com/media/english/breProns/brelasdelemon.mp3?version=1.2.11","noun","trái chanh","Most lemons last through mid-April and grapefruit, through mid-June","Our van turned out to be a real lemon","https://cdn.shopify.com/s/files/1/2336/3219/products/shutterstock_336818993meyer_x850.jpg?v=1554665742");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","melon","ˈmelən","https://www.ldoceonline.com/media/english/breProns/melon0205.mp3?version=1.2.11","noun","quả dưa","By now my man was seeing the ball like a melon","But when she got closer he saw it was only a melon","https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/11/7/0/HE_cantaloupe-2_s4x3.jpg.rend.hgtvcom.476.357.suffix/1371602780993.jpeg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","orange","ˈɒrəndʒ","https://www.ldoceonline.com/media/english/breProns/brelasdeorange.mp3?version=1.2.11","noun","trái cam","Oranges are a good source of Vitamin C"," It is almost impossible to find an orange in Havana","https://sites.psu.edu/lifeitmoveson/files/2017/10/orange-1hoca2l.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("1","papaya","pəˈpaɪə","https://www.ldoceonline.com/media/english/breProns/ld41papaya.mp3?version=1.2.11","noun","đu đủ","Real bananas and papayas are found on the west side of the Waimanu Valley","Other tropical fruits such as mangoes and papaya could be next for the treatment","https://cdn.shopify.com/s/files/1/0076/4339/8233/products/yellow-papaya.jpg?v=1543324363");

INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","asparagus","əˈspærəɡəs","https://www.ldoceonline.com/media/english/breProns/asparagus0205.mp3?version=1.2.11","noun","măng tây","Planted more blueberries and also asparagus","No, it's not a typo, but a broccoli and asparagus hybrid","https://assets.bonappetit.com/photos/5ace174fff795274c43a0d6b/1:1/w_2745,h_2745,c_limit/blistered-asparagus.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","broccoli","ˈbrɒkəli","https://www.ldoceonline.com/media/english/breProns/broccoli0205.mp3?version=1.2.11","noun","bông cải xanh","Steam the carrots and broccoli for 8 minutes","Cook sweetcorn and broccoli in a small amount of salted boiling water","https://www.cookforyourlife.org/wp-content/uploads/2018/08/shutterstock_294838064-min.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","carrot","ˈkærət","https://www.ldoceonline.com/media/english/breProns/carat0205.mp3?version=1.2.11","noun","cà rốt","Governments were forced to adopt a carrot and stick approach to the trade unions","Add chopped carrots and garlic and cook 2 minutes","https://i.ndtvimg.com/mt/cooks/2014-11/carrots.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","cauliflower","ˈkɒlɪˌflaʊə","https://www.ldoceonline.com/media/english/breProns/cauliflower_las2_br.mp3?version=1.2.11","noun","bông cải trắng","Then, for entrance or a parade, you have them carry a melon and a cauliflower to make Melancholy","Serve with new potatoes, broccoli and cauliflower","https://i1.wp.com/www.eatthis.com/wp-content/uploads//media/images/ext/407850298/whole-cauliflower.jpg?fit=1024%2C750&ssl=1");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","garlic","ˈɡɑːlɪk","https://www.ldoceonline.com/media/english/breProns/garlic0205.mp3?version=1.2.11","noun","tỏi","A dunk into that aforementioned garlic butter sauce is highly recommended","To get rid of garlic breath try strong coffee, cloves, honey, yogurt, or parsley","https://5.imimg.com/data5/HL/FE/MY-24461174/garlic-500x500.png");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","lettuce","ˈletɪs","https://www.ldoceonline.com/media/english/breProns/lettuce0205.mp3?version=1.2.11","noun","xà lách","For example, cucumbers, lettuce, tomatoes and tobacco are very susceptible to attacks from the Cucumber Mosaic Virus","This comes during a growing season that has been reasonably favorable to California field crops like lettuce","https://i5.walmartimages.ca/images/Enlarge/006/949/6000196006949.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","mushroom","ˈmʌʃruːm","https://www.ldoceonline.com/media/english/breProns/mushroom_v0205.mp3?version=1.2.11","noun","nấm","Place a cube of Gorgonzola atop each serving of polenta and mushrooms and warm under broiler","Gibbs brought mushrooms for the fiesta","https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/mushrooms.jpg?h=b754914e&itok=Kldbq8Du");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","onion","ˈʌnjən","https://www.ldoceonline.com/media/english/breProns/onion0205.mp3?version=1.2.11","noun","hành tây","At Cheltenham there are leeks to marvel at ... and onions which would make any eye water","Dry-fry the onion and garlic for 5 minutes","https://shopsampars.com/wp-content/uploads/2020/06/onions.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","potato","pəˈteɪtəʊ","https://www.ldoceonline.com/media/english/breProns/potato0205.mp3?version=1.2.11","noun","khoai tây","The Colorado beetle spreads over a potato crop and a human population starves","The salad was in the ice box, and the roast and potatoes in the oven","https://www.irishtimes.com/polopoly_fs/1.3594671.1534163385!/image/image.jpg_gen/derivatives/box_620_330/image.jpg");
INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("2","tomato","təˈmɑːtəʊ","https://www.ldoceonline.com/media/english/breProns/tomato0205.mp3?version=1.2.11","noun","cà chua","I picked up a tomato so big it sat on the ground","He smelled of stale faeces and tomato sauce","https://cdn.shopify.com/s/files/1/0244/4961/3905/products/tomato@2x.jpg?v=1576807420");

-- quiz table
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Present simple tense", "Basic","The present simple tense isn't always so simple for learners but I promise this explanation will make things much clearer. In this section, we'll look at the different uses of the present tense");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Present continuous tense", "Intermediate","This tense is formed using the auxiliary verb have/has plus the past participle of the verb be (been) plus the -ing form of the main verb. We'll learn how to make positive and negative forms, short forms (contractions) and questions");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Present perfect tense", "Uper-Intermediate","Present perfect tense is one of the commonly used verb tenses in English. It describes unfinished actions, experiences or actions without a definite time in the past");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Present perfect continuous tense", "Basic","We use the Present Perfect Continuous to emphasise the duration or continuous course of an action");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Past simple tense", "Intermediate", "An age old habit of humans is the reminiscence of the past. We keep the memories of the past intact to us wishing if we could have changed things");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Past continuous tense", "Intermediate", "Past continuous tense is used to express a continued or ongoing action in past or to indicate that longer action in the past was interrupted");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Planets", "Advanced","The planet Earth on which we live is part of the solar system. The Sun is a star at the centre of the solar system, and eight planets and other bodies revolve around it");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Criminals", "Advanced", "Most countries have laws (official rules set by the government). When people disobey the Law, and we call such people law breakers or criminals. Breaking the law is a crime");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Jobs", "Basic", "One meaning of job is a paid position in regular employment. For example, you may have a job as a teacher, or a dentist, or a taxi-driver");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Colours", "Basic", "The seven colours of the rainbow are the visible part of the electro-magnetic spectrum - they are visible to (or can be seen by) the human eye");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Animal", "Basic", "Below you'll find typical terms that we use to refer to some of the more common animals on Planet Earth. The collective terms describe groups of the animal and are also known as terms of venery");
INSERT INTO `quiz` (`Title`, `Level`,`Description`) VALUES ("Medical", "Advanced", "Here is some essential vocabulary for nurses and medical professionals working in an English-speaking context. Each word is shown with its part of speech and meaning, while an example sentence shows the word in context");

-- quiz_question table
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("1", "He _____ not want to go to the movies", NULL, "text", "single", "do, does, is", "2");
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("1", "Do you _____ chocolate milk?", "https://www.chicagotribune.com/resizer/hkMtMNUEhO4YvQZ6HAdP9q0XmI0=/800x1199/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/PTEBR3XY3ZFPJDLJKRQJAP3J44.jpg", "text", "single", "like, likes, be like, not like", "1");
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("1", "I _____ your friend", NULL, "photo", "single", "https://media-exp1.licdn.com/dms/image/C510BAQE3c1apDb7xMQ/company-logo_200_200/0?e=2159024400&v=beta&t=kSN7BlSrG0dObnaorGM8QWbhHQcfVRzFwuHGjLd6DO4, https://i.pinimg.com/favicons/7a627f330eedc6e0a128458b09b93d153ebd3399d34f4989390d7137.png?a09c3961b465dfac501a3f3561ea9186, https://www.givengain.com/content_members/images/projects/gallery/1/8/8/6/1/KXOBZWRBYL_original.jpg", "2");
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("1", "We _____ European", NULL, "text", "multiple", "live in, are, is, love, in", "1, 2, 4");

INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("2", "_____ they coming over for dinner?", NULL, "text", "single", "Is, Are, Am", "2");
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("2", "Maxwell _____ not sleeping on our sofa", NULL, "text", "single", "Is, Are, Am", "1");
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("2", "My mother-in-law is _____ at our house this week", NULL, "text", "single", "stay, staying, be staying", "2");
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("2", "I _____ my dinner right now", NULL, "text", "single", "eat, eating, am eating", "3");
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("2", "My sister _____ Spanish", NULL, "text", "single", "learn, is learning, learning", "2");
INSERT INTO `quiz_question` (`ID_quiz`, `question`, `questionPic`, `questionType`, `answerSelectionType`, `answers`, `correctAnswer`) VALUES ("2", "I _____ at the hair salon until September", NULL, "text", "single", "work, be working, am working", "3");









