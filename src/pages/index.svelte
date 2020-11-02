<script>
  import { query } from "svelte-apollo";
  import gql from "graphql-tag";
  import { url } from '@sveltech/routify'

  //Main Bids
  const BIDS = gql`
  query MyQuery($agencyFilter: AgencyFilter, $bidFilter: BidFilter) {
    queryBid(first: 20, order: {desc: added}, filter: $bidFilter) @cascade {
      id
      title
      open
      close
      agency(filter: $agencyFilter) {
        name
      }
    }
  }
    `
  let bidSearch;
  let locationSearch;
  const bids = query(BIDS, {
    variables: { agencyFilter: null, bidFilter: null },
  });

  const search = () => {
    let agencyFilter = null;
    let bidFilter = null;
    if(bidSearch){
      bidFilter = {    "title": {"anyoftext": bidSearch},   	"or": {      "description": {"anyoftext": bidSearch}    }  }
    }
    if(locationSearch){
      agencyFilter = {"name": {"anyofterms": locationSearch}, "or": {"location": {"anyofterms": locationSearch}}}
    }

    console.log({ agencyFilter, bidFilter });
    bids.refetch({ agencyFilter, bidFilter });
  }
  
  $: console.log({data: $bids.data});

  //Filters
</script>

<div>
  <div class="bg-unitdark-900 pb-24">
    <nav class="bg-unitdark-900 py-2 border-b-2 border-unitdark-700">
      <div class="max-w-full mx-auto sm:px-6 lg:px-12 ">
        <div class="">
          <div class="flex items-center h-16 px-4 sm:px-0 ">
            <div class="flex items-center w-full">
              <a href="/" class="text-white text-lg font-mono flex mx-auto">
                Bid Aggregator
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <header class="py-10 px-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <h1 class="text-5xl leading-9 font-bold text-white mt-10 text-center">
          Search government bids <span class="text-unit-600">for free</span>
        </h1>
        <h3 class="text-xl leading-9 font-bold text-white mt-12 text-center">
          Over 100,000 bids from local, state, and federal agencies <span class="text-unit-600">updated daily</span>
        </h3>
      </div>
    </header>
  </div>

  <main class="bg-unitdark-900">
    <div class="max-w-7xl mx-auto pb-12">
      <!-- Replace with your content -->
      <div class="bg-unitdark-700 px-5 py-8 sm:px-6 h-24 shadow-2xl -mt-12">
        <div class="flex">
          <div class="w-2/5 flex flex-row align-middle border-r-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6 mr-2 mt-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input bind:value={bidSearch} id="email" class="py-2 px-2 w-full bg-unitdark-700 sm:text-lg sm:leading-5 outline-none text-white" placeholder="bid title or keyword">
          </div>
          <div class="w-2/5 flex flex-row align-middle ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-2 mt-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input bind:value={locationSearch} id="email" class="py-2 px-2 w-full bg-unitdark-700 sm:text-lg sm:leading-5 outline-none text-white" placeholder="anywhere">
          </div>
          <div class="w-1/5 flex flex-row align-middle ml-6 -my-3">
            <button on:click={search} class="bg-unit-600 hover:bg-unit-900 text-white font-bold py-2 px-4 w-full h-full">
              Search
            </button>  
          </div>
        </div>
      </div>
      <!-- /End replace -->

      <div class="flex mb-4 mt-20">

        <div class="w-full">
          <div class="mt-6 flex flex-row">
            {#if $bids.data}
            <h3 class="text-left text-white text-xl w-4/6">{$bids.data.queryBid.length} Active Bids Found</h3>
            {/if}
            <div class="w-2/6 flex flex-row">
              <h5 class="text-white text-md ml-auto mr-2">sort by: </h5>
              <select id="location" class="block pl-3 py-2 text-base leading-6 outline-none bg-white text-unit-600" style="background:none;border:none;">
                <option selected>Relevance</option>
                <option>Date</option>
              </select>
            </div>

          </div>
          <!-- 3. Use $books (note the "$"), to subscribe to query values -->
          {#if $bids.loading}
          Loading...
          {:else if $bids.error}
          Error: {$bids.error.message}
          {:else}
          {#each $bids.data.queryBid as bid}
            <div class="bg-unitdark-700 overflow-hidden sm:rounded-md mt-6 shadow-2xl">
              <div>
                <a href="{$url('/bids/:id', {id: bid.id})}" class="block focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                  <div class="flex items-center px-4 py-8 sm:px-6">
                    <div class="min-w-0 flex-1 flex items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <div class="text-sm text-left leading-5 font-medium text-unit-600 truncate">{bid.title}</div>
                          <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="truncate">Open: {bid.open}</span>
                          </div>
                        </div>
                        <div class="hidden md:block">
                          <div>
                            <div class="text-left text-sm leading-5 text-gray-400 flex flex-row">
                              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-unit-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                              </svg>
                              {bid.agency.name}
                            </div>
                            <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span class="truncate">Close: {bid.close}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          {/each}
          {/if}

        </div>
      </div>
      

      
            
    </div>
  </main>
</div>

