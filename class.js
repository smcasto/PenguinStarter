var studentPromise= d3.json("classData.json");
studentPromise.then (function(penguins){
    console.log(penguins);
    
    drawTable(penguins);  
    initHeaders(penguins);
})

var getHomework = function(penguin)
{
    return penguin.homework.map(getHWgrade);
}
var getHWgrade = function(homework)
{
    return homework.grade
}
var meanHomework = function(penguin)
{
    return d3.mean (getHomework(penguin));
}

var getQuizzes = function(penguin)
{
    return penguin.quizes.map(getQuizgrade);
}
var getQuizgrade = function(quiz)
{
    return quiz.grade
}
var meanQuiz = function(penguin)
{
    return d3.mean (getQuizzes(penguin));
}

var getTests = function(penguin)
{
    return penguin.test.map(getTestgrade);
}
var getTestgrade = function(test)
{
    return test.grade
}
var meanTest = function(penguin)
{
    return d3.mean (getTests(penguin));
}


var getFinal = function(penguin)
{
    return penguin.final[0].grade
};


var drawTable = function(penguins)
{
  var row = d3.select("tbody")
.selectAll("tr")
.data(penguins)
.enter()
.append ("tr")
 row.append("td")
.append("img")
 .attr("src",function(penguin)
      {
    console.log(penguin.picture);
    return "imgs/" + penguin.picture;
})

row.append("td")
 .text (function(penguin)
      {
    return  meanHomework(penguin);
})

row.append("td")
 .text (function(penguin)
      {
    return  meanQuiz (penguin);
})

row.append("td")
 .text (function(penguin)
      {
   
    return  meanTest(penguin);
})

row.append("td")
 .text (function(penguin)
      {
    return  getFinal(penguin);
})
  
};


var clearTable = function()
{
    d3.selectAll("tbody tr")
        .remove();
};




var initHeaders = function(penguins)
{   
    d3.select("#homework")
    .on("click",function()
    { console.log("clicked");
        penguins.sort(function(a,b)
        {
            if(meanHomework(a) > meanHomework(b)) {return 1}
            else if(meanHomework(a) < meanHomework(b)) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(penguins);
        console.log("table was drawn")
        console.log(penguins)
    });
    
    d3.select("#quizzes")
    .on("click",function()
    { console.log("clicked");
        penguins.sort(function(a,b)
        {
            if(meanQuiz(a)> meanQuiz(b)) {return 1}
            else if(meanQuiz(a) < meanQuiz(b)) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(penguins);
    });
    
    
    d3.select("#tests")
    .on("click",function()
    { 
        penguins.sort(function(a,b)
        {
            if(meanTest(a) > meanTest(b)) {return 1}
            else if(meanTest(a) < meanTest(b)) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(penguins);
    });
    
    
    
    d3.select("#final")
    .on("click",function()
    { console.log("clicked");
        penguins.sort(function(a,b)
        {
            if(getFinal(a) > getFinal(b)) {return 1}
            else if(getFinal(a) < getFinal(b)) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(penguins);
    });
    
    
};