jQuery(document).ready(function ($) {
    const url = "https://live.rickstoit.nl/api/" + username + "/video";

    let dataItems = null,
        loadedGroup = null;

    loadData();


    $(document).on("click", ".group", function () {
        let id = $(this).attr('data-id')
        loadedGroup = dataItems[id]
        setVideos(loadedGroup)
    });

    $(document).on("click", ".video", function () {
        let id = $(this).attr('data-id')
        if (id !== '')
            replayVideo(loadedGroup.videos[id])
    });

    $(document).on("click", ".back", function () {
        setGroups(dataItems)
    });

    function loadData() {
        $.getJSON(url)
            .done(function (data) {
                setGroups(data);
                dataItems = data;
            })
            .fail(function () {
                $('#box').html('<span>Er is iets verkeerd gegaan!</span>')
            })
    }

    function setVideos(data) {

        let items = [];
        $('.back').show()

        $.each(data.videos, function (key, val) {
            let item = `
            <tr class='video ${val.isConverting ? 'notAvailable' : ''}' data-id='${val.isConverting ? '' : key}'>
                <td><img src='${val.thumbnail}' alt='Thumbnail'/></td>
                <td>${val.title}</td>
                <td>${val.isConverting ? val.remaining + ' beschikbaar' : val.hits}</td>
            </tr>`
            items.push(item);
        });

        $('#box').empty()

        $("<h2>", {
            "class": "groupTitle",
            text: data.date
        }).appendTo("#box");

        let table = $("<table>", {
            "class": "videos",
        }).appendTo("#box");

        $("<thead>", {
            html: "<tr><th></th><th>Titel</th><th>Hits</th></tr>"
        }).appendTo(table);

        $("<tbody>", {
            html: items.join("")
        }).appendTo(table);

    }

    function setGroups(data) {
        $('.back').hide()
        $('#box').empty()

        let items = [];
        $.each(data, function (key, val) {
            let item = `
            <tr class='group' data-id='${key}'>
                <td><img src='${val.videos[0].thumbnail}' alt='Thumbnail'/></td>
                <td>${val.date}</td>
                <td>${val.counts}</td>
            </tr>`
            items.push(item);
        });


        let table = $("<table>", {
            "class": "groups",
        }).appendTo("#box");

        $("<thead>", {
            html: "<tr><th></th><th>Titel</th><th>Aantal opnames</th></tr>"
        }).appendTo(table);

        $("<tbody>", {
            html: items.join("")
        }).appendTo(table);

    }

    function replayVideo(data) {
        const video = document.querySelector("video");
        const source = data.path;
        const title = $(".player_container .title");
        const detailsDiv = $(".player_container .details");

        let details = `
                <tr><td>Dominee</td><td>${data.details.pastor}</td></tr>
                <tr><td>Ouderling</td><td>${data.details.elder}</td></tr>
                <tr><td>Band</td><td>${data.details.band}</td></tr>
                <tr><td>Collecte</td><td>${data.details.collection}</td></tr>
                `

        detailsDiv.empty();
        title.text(data.title)
        $("<table>", {
            html: details
        }).appendTo(detailsDiv);

        $('.player_container').show()
        const defaultOptions = {ratio: '16:9'};

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(source);
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {

                const availableQualities = hls.levels.map((l) => l.height)

                defaultOptions.quality = {
                    default: availableQualities[0],
                    options: availableQualities,
                    forced: true,
                    onChange: (e) => updateQuality(e),
                }

                const player = new Plyr(video, defaultOptions);
            });
            hls.attachMedia(video);
            window.hls = hls;
        } else {
            const player = new Plyr(video, defaultOptions);
        }

    }

    function updateQuality(newQuality) {
        window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
                window.hls.currentLevel = levelIndex;
            }
        });
    }
});
